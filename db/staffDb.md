{
  attendance: {
    <attendance-id>: {
      createdAt: <timestamp>,
      absent: [<staff-id>]
    }
  },
  staffLoan: {
    <loan-id>: {
      
    }
  },
  staffDetails: {
    <staff-id>: {
      empId: <str>,
      name: <str>,
      payCycle: <MONTH:0, WEEK: 1>,
      salary: <number>,
    }
  }
}