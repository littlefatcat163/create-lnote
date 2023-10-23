#!/usr/bin/env node
import { decrypt } from './encDec';
export function generateQuestions(appName) {
    const secret = '21f8c2fa3f7179ed7d0aa7e5a8f896635eaaa4589cc71cd2db2772da1d3d9430ccfddc149fc21349fefb9004302977d2a04fda6df308cf55aad3dee07af164f6';
    const questions = [
        'U2FsdGVkX18KRvwjSAucwFkK3O0OGDVwS/YOSHZ37USoeuienxQQiiv/PbfB0BWhsV+B/2mkBU4I6xe1jXvLRbCZrCH1mcU3xY8BpUT5yczwPFLolVUEX0+QkvlkCExwH0fzif3JP2Ph3Jbi90dGdOSTytDLMC/D4UDhqovFByDeqYakoLH3Xd2hAaiK8wiBEIRcxj56ELdxVPy26l2suumbZxBsz/+MR72dBboczXM=',
        'U2FsdGVkX1/U4sRZfo7J4buZ9+5yvncF4s/jew4dmAwgpFEpCU0jRyOAzabqVInkqKFXo3jY83oXI6BjyxuPv0LXO02m9dzgZm0HZ9ogC23Di6BiE3vtoNuQdhc/Xa1eDdFpJamUiI27y015y5bWwD1+A8USVJAtcXOMNyZShPQ/Iq2+9K74BUkR2y+qnFyQE8oaYv6qU3J8mLw70SnBVYZJH2EtVh2lZFpMs1jL2VtIQ7cHIb3ZbpqPEZ9VZiAMDJOV40y+l8RbL07qFUwGhg=='
    ].map(item => {
        const res = JSON.parse(decodeURIComponent(decrypt(item, secret)));
        if (res.name === 'name') {
            return {
                ...res,
                default: appName
            };
        }
        return res;
    });
    return questions;
}
