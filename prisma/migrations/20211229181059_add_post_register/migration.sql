-- CreateTable
CREATE TABLE "PostRegister" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostRegister_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostRegister" ADD CONSTRAINT "PostRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRegister" ADD CONSTRAINT "PostRegister_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
