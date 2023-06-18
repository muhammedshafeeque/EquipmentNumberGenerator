localStorage.setItem("sets",
  JSON.stringify( [
    {
      name: "samp",
      tables: [{ head: "mas", type: "Date", defaultValue: "2023-06-20" }],
    },
    {
      name: "Own Container",
      tables: [
        { head: "EquipmentType", type: "String", defaultValue: "20DV" },
        { head: "InDate", type: "Date", defaultValue: "2022-01-01" },
        { head: "DateOfManufacture", type: "Date", defaultValue: "2020-01-14" },
        { head: "PrivateYard", type: "String", defaultValue: "BCE" },
        { head: "Office", type: "", defaultValue: "TSK" },
        { head: "WeightUnit", type: "", defaultValue: "MT" },
        { head: "MaxGrossWeight", type: "Number", defaultValue: "10" },
        { head: "TareWeight", type: "Number", defaultValue: "10" },
        { head: "MaxPayload", type: "Number", defaultValue: "10" },
      ],
    },
    {
      name: "Dso",
      tables: [
        { head: "MoveDate", type: "Date", defaultValue: "2023-06-13" },
        { head: "Agent", type: "", defaultValue: "TSK" },
        { head: "BookingNumber", type: "", defaultValue: "TASS/BK/1348" },
        { head: "Port", type: "", defaultValue: "COK" },
        { head: "Yard", type: "", defaultValue: "BCE" },
        { head: "Remarks", type: "", defaultValue: "remark" },
      ],
    },
    {
      name: "OFO",
      tables: [
        { head: "MoveDate", type: "Date", defaultValue: "2023-06-13" },
        { head: "Agent", type: "", defaultValue: "TSK" },
        { head: "BookingNumber", type: "Number", defaultValue: "10" },
        { head: "Port", type: "", defaultValue: "COK" },
        { head: "Vessel", type: "", defaultValue: "MSN" },
        { head: "Voyage", type: "", defaultValue: "gdgk" },
        { head: "Termina", type: "", defaultValue: "VICTT" },
        { head: "Berth", type: "", defaultValue: "VICTT" },
        { head: "Remarks", type: "", defaultValue: "remark" },
      ],
    },
  ])
);
