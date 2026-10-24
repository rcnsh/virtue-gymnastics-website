-- Replace Clerk with built-in email/password auth.

-- AlterTable
ALTER TABLE "users" ADD COLUMN "password_hash" VARCHAR(255),
ADD COLUMN "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(64) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- Deleting a user now removes their students and bookings instead of failing.
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
