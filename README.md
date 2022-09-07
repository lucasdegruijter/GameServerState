# GameServerState
Track statuses of game servers in discord

### servers.JSON
| Field            | Type             | Requirements        | Notes                                                                                                  |
|------------------|------------------|---------------------|--------------------------------------------------------------------------------------------------------|
| `server_id`      | int              | mandatory           | Unique key given to every game server                                                                  |
| `title`          | string           | optional            | Title of the Embed message.                                                                            |
| `game`           | string           | mandatory           | Game name                                                                                              |
| `address`        | string           | mandatory           | Relative server address.                                                                               |
| `port`           | int              | mandatory           | Server Port.                                                                                           |
| `channel`        | int              | mandatory           | Discord channel id for the game.                                                                       |
| `message_id`     | int              | autofill            | id of the message to update.                                                                           |
| `image_url`      | string           | optional            | URL of the Thumbnail image URL                                                                         |
| `direct_join`    | bool             | optional            | Set the link to directly join the server                                                               |
| `color`          | string           | optional            | RGB color code : #5b8731                                                                               |
| `country`        | bool  or  string | optional   autofill | Show the country field, set to false, to disable                                                       |
| `public_address` | string           | optional            | Displayed address with port.                                                                           |
| `password`       | string           | optional            | Server Password.                                                                                       |
| `maxplayers`     | int              | optional            | Maximum number of players, overwrite auto-detection if defined.                                        |