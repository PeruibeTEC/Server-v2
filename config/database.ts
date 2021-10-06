import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

let databaseConfig!: DatabaseConfig

if (Env.get('NODE_ENV') === 'development') {
  databaseConfig = {
    connection: Env.get('DB_CONNECTION'),

    connections: {
      pg: {
        client: 'pg',
        connection: {
          host: Env.get('PG_HOST'),
          port: Env.get('PG_PORT'),
          user: Env.get('PG_USER'),
          password: Env.get('PG_PASSWORD', ''),
          database: Env.get('PG_DB_NAME'),
        },
        migrations: {
          naturalSort: true,
        },
        healthCheck: false,
        debug: false,
      },
    },
  }
} else if (Env.get('NODE_ENV') === 'testing') {
  databaseConfig = {
    connection: Env.get('DB_CONNECTION'),

    connections: {
      pg: {
        client: 'pg',
        connection: {
          host: Env.get('PG_HOST'),
          port: Env.get('PG_PORT'),
          user: Env.get('PG_USER_TEST'),
          password: Env.get('PG_PASSWORD_TEST', ''),
          database: Env.get('PG_DB_NAME_TEST'),
        },
        migrations: {
          naturalSort: true,
        },
        healthCheck: false,
        debug: false,
      },
    },
  }
}

export default databaseConfig
