const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function insertData() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync(
        'C:\\Users\\jacob\\WebstormProjects\\virtue-gymnastics-website\\pages\\api\\json\\classes.json',
        'utf-8',
      ),
    );

    for (const data of jsonData) {
      const classData = await prisma.class.upsert({
        where: { id: data.id },
        update: {
          name: data.name,
          cost: data.cost,
          backgroundColor: data.backgroundColor,
          description: data.description,
          ageGroup: data.age,
          schedules: {
            create: {
              startTime: data.startTime,
              endTime: data.endTime,
              daysOfWeek: { set: data.daysOfWeek },
            },
          },
        },
        create: {
          id: data.id,
          name: data.name,
          cost: data.cost,
          backgroundColor: data.backgroundColor,
          description: data.description,
          ageGroup: data.age,
          schedules: {
            create: {
              startTime: data.startTime,
              endTime: data.endTime,
              daysOfWeek: { set: data.daysOfWeek },
            },
          },
        },
      });

      console.log(`Class created/updated: ${classData.id}`);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertData();
