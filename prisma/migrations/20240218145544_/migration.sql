-- AddForeignKey
ALTER TABLE "profiles_Doctor" ADD CONSTRAINT "profiles_Doctor_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
