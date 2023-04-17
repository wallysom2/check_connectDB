import prisma from '../config/databaseConfig.js';
import { Blacklist } from '@prisma/client';


export async function isWordFromBlacklist(word: string): Promise<boolean>{
    const wordFromBlacklist: Blacklist = await prisma.blacklist.findUnique({
        where: {
            word
        }
    });
    if(wordFromBlacklist){
        return true;
    }
    return false;
}

export async function addWordToBlacklist(word: string): Promise<void> {
  await prisma.blacklist.create({
    data: {
        word,
    },
  });
}

export async function removeWordBlackList(word: string): Promise<void> {
    await prisma.blacklist.delete({
        where: {
            word,
        },
    });
}

export async function getWordsBlacklist(): Promise<string[]> {
    const blacklistedWords = await prisma.blacklist.findMany();
    return blacklistedWords.map((word) => word.word);
}


