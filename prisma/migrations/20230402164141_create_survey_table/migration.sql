-- CreateTable
CREATE TABLE `Record` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Survey` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `federalSubject` VARCHAR(191) NOT NULL,
    `workBy` VARCHAR(191) NOT NULL,
    `markerIndex` VARCHAR(191) NOT NULL,
    `markerName` VARCHAR(191) NOT NULL,
    `placingYear` INTEGER NOT NULL,
    `signType` VARCHAR(191) NOT NULL,
    `signHeight` INTEGER NOT NULL,
    `centerType` VARCHAR(191) NOT NULL,
    `altitude` INTEGER NOT NULL,
    `trapezes` VARCHAR(191) NOT NULL,
    `signIsPlaced` ENUM('MISSING', 'PRESENT') NOT NULL,
    `monolith1IsIntact` ENUM('INTACT', 'NOT_INTACT') NOT NULL,
    `monolith2IsOpened` ENUM('OPENED', 'NOT_CLOSED') NOT NULL,
    `monoliths3And4AreOpened` ENUM('OPENED', 'NOT_CLOSED') NOT NULL,
    `outerSignIsIntact` ENUM('INTACT', 'NOT_INTACT') NOT NULL,
    `orp1IsIntact` ENUM('INTACT', 'NOT_INTACT') NOT NULL,
    `orp2IsIntact` ENUM('INTACT', 'NOT_INTACT') NOT NULL,
    `trenchIsReadable` ENUM('READABLE', 'UNREADABLE') NOT NULL,
    `centerMarkPhoto` VARCHAR(191) NOT NULL,
    `exteriorPhoto` VARCHAR(191) NOT NULL,
    `upperMarkBelowGroundHeight` VARCHAR(191) NOT NULL,
    `satelliteObservability` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `approvedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
