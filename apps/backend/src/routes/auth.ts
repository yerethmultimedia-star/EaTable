import { Router } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/social-login', async (req, res) => {
  const { provider, providerId, name, email } = req.body;

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const data: Prisma.UserUncheckedCreateInput = {
        name,
        email,
        password: '',
        provider: provider ?? null,
        providerId: providerId ?? null
      };

      user = await prisma.user.create({ data });
    }

    res.json({ user, token: 'FAKE_JWT_TOKEN' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login social' });
  }
});

export default router;
