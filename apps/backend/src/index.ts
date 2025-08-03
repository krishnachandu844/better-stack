import express from "express";
import prisma from "@repo/db/client";
import { SigninSchema, SignupSchema } from "./type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/website", authMiddleware, async (req, res) => {
  const { url, regionId, websiteName } = req.body;
  const isWebsiteExists = await prisma.website.findFirst({
    where: {
      userId: req.userId,
      websiteName,
      url,
    },
  });
  if (isWebsiteExists) {
    res.status(411).json({ message: "Website Already Exists" });
    return;
  }
  if (!url) {
    res.status(411).json({ message: "Enter URL of Website" });
    return;
  }
  const website = await prisma.website.create({
    data: {
      websiteName,
      url,
      userId: req.userId!,
    },
  });
  res.status(200).json({
    id: website.id,
    message: "Website Added Sccessfully",
  });
});

//Getting specific website last 10 ticks
app.get("/status/:websiteId", authMiddleware, async (req, res) => {
  const websites = await prisma.website.findFirst({
    where: {
      userId: req.userId!,
      id: req.params.websiteId,
    },
    include: {
      ticks: {
        orderBy: [{ createdAt: "desc" }],
        take: 10,
      },
    },
  });
  res.json(websites);
});

//Getting all Websites of an user
app.get("/websites", authMiddleware, async (req, res) => {
  try {
    const websites = await prisma.website.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        ticks: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    res.status(200).json(websites);
  } catch (error) {}
});

app.post("/user/signup", async (req, res) => {
  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error.toString());
    res.status(403).json({ message: "Invalid Credentials" });
    return;
  }
  try {
    const isUserExists = await prisma.user.findFirst({
      where: {
        username: parsedData.data.username,
      },
    });
    if (isUserExists) {
      res.status(403).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = bcrypt.hashSync(parsedData.data.password, 10);
    await prisma.user.create({
      data: {
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName,
        username: parsedData.data.username,
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(403).send("error");
  }
});

app.post("/user/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error.toString());
    res.status(403).json({ message: "Invalid Credentials" });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: parsedData.data.username,
      },
    });
    if (!user) {
      res.status(403).json({ message: "User doesn't exists" });
      return;
    }
    const isPasswordCorrect = bcrypt.compareSync(
      parsedData.data.password,
      user.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign({ userId: user.id }, "123123");
      res.status(200).json({ message: "Login Successfully", token });
      return;
    }
    res.status(403).json({ message: "Incorrect Password" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Server Started");
});
