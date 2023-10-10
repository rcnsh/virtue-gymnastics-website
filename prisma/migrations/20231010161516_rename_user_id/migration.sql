-- CreateTable
CREATE TABLE "students" (
    "parent_first_name" VARCHAR NOT NULL,
    "parent_last_name" VARCHAR NOT NULL,
    "address1" VARCHAR NOT NULL,
    "address2" VARCHAR,
    "city" VARCHAR NOT NULL,
    "county" VARCHAR NOT NULL,
    "postcode" VARCHAR NOT NULL,
    "home_phone" VARCHAR,
    "work_phone" VARCHAR,
    "mobile_phone1" VARCHAR NOT NULL,
    "mobile_phone2" VARCHAR,
    "hear_about_us" VARCHAR NOT NULL,
    "student_first_name" VARCHAR NOT NULL,
    "student_last_name" VARCHAR NOT NULL,
    "student_dob" DATE,
    "student_gender" VARCHAR NOT NULL,
    "student_medical_conditions" TEXT[],
    "student_additional_info" VARCHAR(500),
    "student_preferred_days" TEXT[],
    "student_photo_consent" BOOLEAN DEFAULT false,
    "student_video_consent" BOOLEAN DEFAULT false,
    "student_walking_home_consent" BOOLEAN DEFAULT false,
    "terms_and_conditions" BOOLEAN DEFAULT false,
    "privacy_policy" BOOLEAN DEFAULT false,
    "marketing_consent" BOOLEAN DEFAULT false,
    "user_id" VARCHAR(255),
    "student_id" SERIAL NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
