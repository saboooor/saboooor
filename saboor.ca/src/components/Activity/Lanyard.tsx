import { Gamepad, Music, Play } from 'lucide-icons-qwik';

export const activityType = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening to',
  3: 'Watching',
  4: '',
  5: 'Competing In',
};

export const activityTypeIcons = {
  0: <Gamepad size={20} />,
  1: <Play size={20} />,
  2: <Music size={20} />,
  3: <Play size={20} />,
  4: '',
  5: <Gamepad size={20} />,
};

export function convertTime(duration: number) {
  let seconds: number | string = Math.floor((duration / 1000) % 60);
  let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
  const hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

  // pad seconds
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  // if less than 1 hour, don't show hours
  if (duration < 3600000) return minutes + ':' + seconds;

  // pad minutes
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  return hours + ':' + minutes + ':' + seconds;
}

export function connectLanyardSocket(
  discordId: string,
  onData: (data: any) => void,
  onError?: (error: string) => void,
  isSafari?: boolean,
): () => void {
  let ws: WebSocket | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  let connectionTimeout: NodeJS.Timeout | null = null;
  let isReconnecting = false;
  let connectionAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 3;

  const connect = () => {
    try {
      // Don't try to reconnect indefinitely
      if (connectionAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log('Max reconnection attempts reached, giving up');
        onError?.('Failed to establish WebSocket connection after multiple attempts');
        return;
      }

      connectionAttempts++;
      ws = new WebSocket('wss://lanyard.twink.forsale/socket');

      // Set a connection timeout
      connectionTimeout = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.CONNECTING) {
          console.log('WebSocket connection timeout');
          ws.close();
          onError?.('WebSocket connection timed out');
        }
      }, 10000); // 10 second connection timeout

      ws.onopen = () => {
        console.log('Lanyard WebSocket connected');
        connectionAttempts = 0; // Reset on successful connection

        if (connectionTimeout) {
          clearTimeout(connectionTimeout);
          connectionTimeout = null;
        }

        // Subscribe to user
        ws?.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: discordId,
          },
        }));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          switch (message.op) {
          case 1: // Hello
            // Set up heartbeat
            if (heartbeatInterval) clearInterval(heartbeatInterval);
            heartbeatInterval = setInterval(() => {
              ws?.send(JSON.stringify({ op: 3 }));
            }, message.d.heartbeat_interval);
            break;
          case 0: // Event
            if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
              // Check if discord_user data is missing
              if (!message.d?.discord_user) {
                onData({
                  success: false,
                  error: 'Discord user data not available. You need to either join the Lanyard Discord server (https://discord.gg/lanyard) or invite the Lanyard bot to your Discord server to use this feature.',
                });
                return;
              }

              parseLanyardData(message.d, isSafari);
              onData({
                success: true,
                data: message.d,
              });
            }
            break;
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('Lanyard WebSocket disconnected');
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }

        // Attempt to reconnect if not manually closed
        if (!isReconnecting) {
          isReconnecting = true;
          reconnectTimeout = setTimeout(() => {
            isReconnecting = false;
            connect();
          }, 5000);
        }
      };

      ws.onerror = (error) => {
        console.error('Lanyard WebSocket error:', error);
        onError?.('WebSocket connection error');
      };

    } catch (error) {
      console.error('Error connecting to Lanyard WebSocket:', error);
      onError?.('Failed to connect to WebSocket');
    }
  };

  // Initial connection
  connect();
  // Return cleanup function
  return () => {
    isReconnecting = true; // Prevent reconnection
    connectionAttempts = MAX_RECONNECT_ATTEMPTS; // Prevent further attempts

    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
    if (connectionTimeout) {
      clearTimeout(connectionTimeout);
    }
    if (ws) {
      ws.close();
    }
  };
}

export async function getLanyardData(isSafari = false) {
  try {
    const data = await fetch('https://lanyard.twink.forsale/v1/users/249638347306303499');
    const json = await data.json() as any;
    if (!json.success) throw new Error(json.error);

    parseLanyardData(json.data, isSafari);

    return { ...json.data, isSafari };
  } catch (error) {
    console.error('Error fetching Lanyard data:', error);
    return null;
  }
}

export function parseDiscordImageUrl(image_id: string, app_id?: string, isSafari = false) {
  // if the image is from rise, safari shits itself
  if (isSafari && image_id?.includes('rise.cider.sh')
    && (image_id?.includes('avif') || image_id?.includes('gif'))) return undefined;
  return image_id.startsWith('mp:')
    ? `https://media.discordapp.net/${image_id.replace('mp:', '')}`
    : image_id.startsWith('spotify:')
      ? `https://i.scdn.co/image/${image_id.replace('spotify:', '')}`
      : app_id
        ? `https://cdn.discordapp.com/app-assets/${app_id}/${image_id}`
        : image_id;
}

export function parseLanyardData(data: any, isSafari = false) {
  // go through activities and parse asset links
  data.activities.forEach((activity: any) => {
    const app_id = activity.application_id;

    let large_image = activity.assets?.large_image;
    if (large_image) {
      large_image = parseDiscordImageUrl(large_image, app_id, isSafari);
      activity.assets.large_image = large_image;
    }

    let small_image = activity.assets?.small_image;
    if (small_image) {
      small_image = parseDiscordImageUrl(small_image, app_id, isSafari);
      if (!large_image) {
        activity.assets.large_image = small_image;
        activity.assets.small_image = undefined;
      }
      else {
        activity.assets.small_image = small_image;
      }
    }
  });

  return data;
}