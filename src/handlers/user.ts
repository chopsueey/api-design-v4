import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export async function createNewUser(req, res, next) {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
}

export async function signin(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "User does not exist or password is wrong." });
    return;
  }

  const passwordMatches = await comparePasswords(req.body.password, user.password);

  if (!passwordMatches) {
    res.status(401);
    res.json({ message: "User does not exist or password is wrong." });
    return;
  }

  const token = createJWT(user);

  res.status(200);
  res.json({ message: "Success! You are logged in now.", data: { token } });
}
