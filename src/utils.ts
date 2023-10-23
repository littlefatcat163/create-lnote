import si from 'systeminformation'

export function randomRange(min: number = 1, max: number = 10) {
    return Math.floor(Math.random() * (max - min)) + 1
}

export async function pcInfo() {
    const { serial } = await si.osInfo()
    return { serial }
}