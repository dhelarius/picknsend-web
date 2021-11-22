const staticData = () => {
  const data = [
    {
        "npsv": "1264",
        "name": "ELIZABETH",
        "lastName": "GUZMAN",
        "address": "RESIDENCIAL GLORIA",
        "phone": "(809)604-7881",
        "dni": null,
        "email": "PAVELI73@HOTMAIL.COM",
        "creationDate": "2013-04-09",
        "status": "A",
        "actions": "1264"
      },
      {
        "npsv": "1918",
        "name": "CESARINA",
        "lastName": "BONIFACIO",
        "address": "SANCHEZ #45",
        "phone": "(829)262-3012",
        "dni": "047-0210363-3",
        "email": "CESARINA_BONIFACIO@HOTMAIL.COM",
        "creationDate": "2013-04-10",
        "status": "A",
        "actions": "1918"
      },
      {
        "npsv": "01",
        "name": "JORGE LUIS ",
        "lastName": "VIALET JIMENEZ",
        "address": "LOS MULTI, CALLE INTERIOR NO.67",
        "phone": "(829)562-0813",
        "dni": "047-0174800-8",
        "email": null,
        "creationDate": "2013-04-12",
        "status": "A",
        "actions": "01"
      },
      {
        "npsv": "02",
        "name": "JEURIS",
        "lastName": "FANA",
        "address": "AV. RIVAS , FRENTE A LA PARADA DE BONAO",
        "phone": "(829)204-5779",
        "dni": "047-0203462-2",
        "email": "YOREPAROTUCAMARA@HOTMAIL.COM",
        "creationDate": "2013-04-13",
        "status": "A",
        "actions": "02"
      },
      {
        "npsv": "03",
        "name": "RICARDO ANTONIO",
        "lastName": "BEATO",
        "address": "C/2 NO.2 RESIDENCIAL GAMUNDI",
        "phone": "(809)396-8091",
        "dni": "047-0099264-9",
        "email": "TONYBEATOH@YAHOO.ES",
        "creationDate": "2013-04-13",
        "status": "A",
        "actions": "03"
      },
      {
        "npsv": "04",
        "name": "JOSE ",
        "lastName": "MENDOZA",
        "address": "LAS CARRERAS NO.19",
        "phone": "(829)314-1630",
        "dni": "047-0003907-8",
        "email": "INGCHINOLV@GMAIL.COM",
        "creationDate": "2013-04-15",
        "status": "A",
        "actions": "04"
      }
]
  return [...data, ...data, ...data]
}

export { staticData }