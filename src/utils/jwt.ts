/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = config.get<string>(keyName);

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  try {
    const publicKey = config.get<string>(keyName);
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
