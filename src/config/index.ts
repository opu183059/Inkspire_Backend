import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
  node_env: process.env.NODE_ENV,
  jwt_login_token_secret: process.env.JWT_LOGIN_TOKEN_SECRET,
};
