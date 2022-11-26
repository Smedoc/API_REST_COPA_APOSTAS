//USADO PARA TESTAR A MINHA BASE E DADOS SEM CRIAR UMA BD

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data:{
            name: 'Smedo',
            email: 'smedo@gmail.com',
            avatarUrl: 'https://github.com/Smedoc.png',
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'exemplo de pool',
            code: 'BOL123',
            ownerId: user.id,

            participantes:{
                create:{
                    userId: user.id
                }
            }

        }
    })


    const game = await prisma.game.create({
        data:{
            data: '2022-11-06T10:32:55.673Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountyCode: 'BR'
        }
    })

    const game1 = await prisma.game.create({
        data:{
            data: '2022-11-07T10:32:55.673Z',
            firstTeamCountryCode: 'AO',
            secondTeamCountyCode: 'AR',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participantes:{
                        connect:{
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        
        }
    })
}

main();