app_name="geodesy"

# # BUILD THE PACKAGE
sudo -u www-data npm run build --MODE=production

# # COPY THE PACKAGE TO THE REMOTE MACHINE
sudo -u www-data cp -r package.json package-lock.json ./build
sudo -u www-data cp -r prisma/schema.prisma ./build/prisma

cd ./build
sudo -u www-data npm ci --omit dev
sudo -u www-data npx prisma generate
cd ../

sudo -u www-data pm2 stop /build/index.js --name $app_name 2>/dev/null
sudo -u www-data pm2 delete /build/index.js --name $app_name
HOST=127.0.0.1 PORT=3000 sudo -u www-data pm2 start /build/index.js --name $app_name
