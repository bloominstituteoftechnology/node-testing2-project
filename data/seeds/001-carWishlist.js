const dreamCars = [
  {
    make: 'Cadillac',
    model: 'CT-4',
    trim: 'V-Blackwing',
    price: 86375,
    link: `https://www.cadillac.com/sedans/ct4-v-blackwing/build-and-price/summary?styleId=427641&rpo=LF4,MG9,GT4,RRR,GCF,AQJ,HEB,IOT,CFZ,CFV,CWM,Y6F,IWE,PDJ,J6O,5ZD,CF5,VS2,B6A,5JS,AHC,AF6,KU9,53S,BTH,UV6,KEM,UQT,&ss=H4sIAAAAAAAAAK1UPU/DMBB9rflYmZiQGDqBAImWVhQGcNK4aUpp0jQtzc6G2BELEwO/gl/AxP+Du8R2AhTRApYc3Xt5Pp99dwawCTy9Yu3xDtXrW1STGMx9wJXH+5vgGRXw2II4jEOIC3UEMei2IbpjspRH1qhxTFCmEDIi2BuOCV7Sx/cc+qQRQVeRbjSCCFpDiGbagQg7gZbIKLOkWWGtZiOGcKcD+qgJwYChar7RQD72IWq1Ghl5mFmQFvDyArgMqpp4gWaDsoTCyiWrNH3mVhYyhFQtvXKN5nnmbTlDSN/VLtZp7unzFUYD+veBMb5lyJf6P199789Ho7LIl1cMW82znutWlwzJaUkUqTw17NhHkb1l/FFJwRYBV1oJpNqf3amSV6SVeHWndLhtGLYzl+3OYbmJrLuuI0uSBy3h/ikk1HkW+I435265ewoJdeBXCbeplfSmJsnL3h33s3XT9walxJwxR83RT9r4YwXxs2N34efHAn5FLOAXxoJYmYay3SwWMkQczj6vXPAdiMP0tyujBEWSMpZiSaKx1tkLpfiSiXltytc8iesl9gSZIWYthaKCG9DGBnawizokXHTgQdGWPQToI0SMK8yM8KfxDpKF/55MBgAA&postalCode=84005`,
  },
  {
    make: 'Cadillac',
    model: 'CT-5',
    trim: 'V-Blackwing',
    price: 129785,
    link: `https://www.cadillac.com/sedans/ct5-v-blackwing/build-and-price/summary?styleId=428020&rpo=LT4,MJK,GT4,RHL,GCF,AQJ,HJD,IOT,CFV,CFZ,PDJ,Y6L,J57,J6O,5ZD,C3U,VS2,B6A,5JS,IWE,53S,UQT,KEM,DRZ,&ss=H4sIAAAAAAAAAH1STU/CQBB9sOrdiwevTYwHPUBpwQOH0i9YihRaSmi8ejP+Aa9GE3+Fv8Nf5cG7zrTL7hoSNoHOm3mz82ZnAFwAH984e/9B9/EZ3U0B9v3DnbeXJ/mJDvhcQvSKCiIrBxALOYdI2UriO4iV7xIMaohgRXCaLiBmy5J86y1BGapAes++MIFYTzMI6S8hvDpiCv15bgERJlTDk2y5G6J4Q4h5TPdtVuUvHbTnCsJxHDJacY00DfgiA0IGXeX4QmM0FQyFJLQU/o3Zd2IMCidknCn+uBUgAuqq9XLSLVS4tw9TvybJeKXycFK/o7pRhpj4gaV1iAY0D6G18vtYoKbPqc2n3qJ1bd0SKC8PSiemk8BS96rU8WQMhaarAU/U8K8Vn6emKTxvA7axkiC4vf3jaKOnRPF4dRKvQ5vAjgdF4eEfdpPZ6ngbNcgjaYMMh6Pj5dOUIt/hyPCLvD4WLjMXZguCfX9DVYmW1lSq8p4lZqQoVdG3+hup/na+kQicw8ENXAyoQogIMRJMMYPEHEuUqLCFRT92/gBujUcf+gMAAA==&postalCode=84005`,
  },
  {
    make: 'GMC',
    model: 'Canyon',
    trim: 'AT4X',
    price: 68330,
    link: `https://www.gmc.com/trucks/canyon/elevation/build-and-price/summary?styleId=431410&rpo=L3B,MFC,GU6,GBA,A50,HV1,URL,XS1,VBP,RZY,VW1,SIQ,SMU,CAC,RW2,SD0,S3W,S0Y,RIK,VZJ,UXA,SD5,&ss=H4sIAAAAAAAAAH2SP1ODQBDFH+xMGhsb7R16B0KiY3mAJAhE5ORvb+f4MSztLOz8pnpr8EicHbfi/WZ5790BgHPg7QyL9yXcpxe4jQazI+28fgzPn3DAcwpaPfagIoxAZRqDNs0VKL29AdXhykg1gtTaB23bANTUhWGRAvU6mFZiZV6rsxyk/eHLDPZzAfI8zzzso36CrGBLK9jBCs62gqNmYapZwXWs4PpW8DGs2EXstpiAi4nG1wKt4vyAXk6UzyjQLJ9D6qqabOyKY2i3lOg4CNTc3Gynw05aCXuhh44GiSa+5JCsJZo9SLRsBMqf39ZseiWstBHfBf2l96NQs+0CyWG8Eyj/b7/RwAkUYiRIscEWOQqU2EHjYOW/+QZuaZJZKgMAAA==&postalCode=84005`,
  },
  {
    make: 'GMC',
    model: 'Sierra',
    trim: 'AT4X',
    price: 91485,
    link: `https://www.gmc.com/trucks/sierra/1500/sle-elevation-slt/build-and-price/summary?styleId=427289&rpo=L87,MHS,GU5,Q89,QFL,RHF,GBA,A50,H9J,IOK,ULV,PDL,PZG,PZL,PZN,PZ9,S4D,VPS,NAA,S1O,AAO,VBJ,R7N,&ss=H4sIAAAAAAAAAH1RMVLDMBDc+CAlBQUzVBRuKMmQYLtDxrFNUBzHwk5wRQOTig9QpYCCT4POFjIMGq6RdnXa3ZMAnAAfzxi/ncJ7eoFXKzD3C4/eX/cP1xiB6xg0VRlIhgFomStQVs9A6TwCVesQtE6l3uWpPhAtSMwuQHm0AN2u7jQXC9PXN4ff18pEfupCX2cg3/f1pjftLC1gyQGIlV48Q+zQgS6ObWHPAei0FnAuCzifBTyeBTymBYUQDsMiZsOxYQ9gem8CB6tHHeTKNnLIlW3mZKWTLRwsv6yDTVnh0LCJCVQFhYnH7KNJxn9oY/IfDZPszEU1+fn4+47T7DRxWKsr6VCoZTOYNPHCIdeUyiHXbDd/5YAjnGOCS0QQmCPFEiUqKNxjgy2s1f/1BZcczBgXAwAA&postalCode=84005`,
  },
  {
    make: 'GMC',
    model: 'Yukon',
    trim: 'AT4',
    price: 84150,
    link: `https://www.gmc.com/suvs/yukon/sle-slt/build-and-price/summary?styleId=428107&rpo=L84,MHS,GU5,GAZ,A50,HI9,IOK,PEH,CWM,NHT,ZL6,Z6E,ZM1,RGC,G96,JL1,PTT,V03,F47,5JL,VTA,C3U,RIK,B3L,ATN,AAK,RIB,CAV,UV6,UKK,THS,UV2,TRO,TRG,UET,PZ8,UKV,NZH,&ss=H4sIAAAAAAAAAH1TTU+DQBB97cZ6NF78Az2btEI/E2OgRaALlMJCU+7ejDdP3o3xV/j7/BO6Q+lCzcS5sO/lzZvdmQHADfD5jcGHRP/pBf0iB3FnuPf+9rz5Qg8U1xB27kJEcxsiDnIIv5hAPHoLfXIqCGcygghCDcOthEi9AKKKxxBZqGGpHIjJJiKoXTJ/pTNU8qMDx9DK4XCoD8d6l7eZp8Z5ZYi6vAFkZQCVboEj9affEKTSgGq1EteKOpIl6oNYWQXHOuVfO6HZfVwfzrWP9oxxoBaZ0v5iykioga1E99UAaqgB1FgDNtGYcaLxABcN+3psbT0vk5i4ZDloiF4jSVYzjg0U8850HXS0UaOlibelFydWqQ4rm3Gk1Zy5fDY9dHyXjQPtirl85secJHSZIdHimcR8bTF3VnVjTomySVSZz7Jbhi08xbykkJJlS44t71iWW5Ri353d6fnlyGK05U5yWv0jmqZUU49JrCKuNP3LZjFwBRv3eICLNTz4CBAjwRYpdshwQEf6X/wCEQOHdYkEAAA=&postalCode=84005`,
  },
]

exports.seed = async function(knex) {
  return knex('cars')
    .truncate()
    .then(() => {
      return knex('cars').insert(dreamCars)
    })
};