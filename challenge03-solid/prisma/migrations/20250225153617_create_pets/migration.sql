-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Adulto', 'Idoso');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Pequenino', 'Medio', 'Grande');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Baixa', 'Media', 'Alta');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('Baixo', 'Medio', 'Alta');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Amplo', 'Medio', 'Pequeno');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'Filhote',
    "size" "Size" NOT NULL DEFAULT 'Pequenino',
    "energy" "Energy" NOT NULL DEFAULT 'Baixa',
    "independence" "Independence" NOT NULL DEFAULT 'Baixo',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
