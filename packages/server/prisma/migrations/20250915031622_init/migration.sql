-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."urls" (
    "id" BIGSERIAL NOT NULL,
    "short_code" VARCHAR(15),
    "date" DATE NOT NULL,
    "long_url" VARCHAR(100) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clicks" (
    "id" BIGSERIAL NOT NULL,
    "short_code" VARCHAR(15) NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(100),

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."url_analytics" (
    "id" BIGSERIAL NOT NULL,
    "short_code" VARCHAR(15) NOT NULL,
    "clicks" BIGINT NOT NULL,

    CONSTRAINT "url_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "public"."admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "public"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_code_key" ON "public"."urls"("short_code");

-- CreateIndex
CREATE UNIQUE INDEX "url_analytics_short_code_key" ON "public"."url_analytics"("short_code");

-- AddForeignKey
ALTER TABLE "public"."urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."clicks" ADD CONSTRAINT "clicks_short_code_fkey" FOREIGN KEY ("short_code") REFERENCES "public"."urls"("short_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."url_analytics" ADD CONSTRAINT "url_analytics_short_code_fkey" FOREIGN KEY ("short_code") REFERENCES "public"."urls"("short_code") ON DELETE RESTRICT ON UPDATE CASCADE;
