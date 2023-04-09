// ts-node 사용 시 PrismaClient 생성자가 빈 object를 반환하는 문제가 있어 js로 작성
const { PrismaClient } = require('.');
const client = new PrismaClient();

async function main() {
  Array.from({ length: 500 }, async (_, item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 8,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

module.exports = {};
