# Salary Calculation
Calculaing salary for 
staffId: 125 
paycycle: WEEK[1]
salary: 2000
salaryperday: 2000/7 = 285.7142857143

## Calculating attendance
- for every employee do in query in the `absent` array week based on createdAt in `attendance` db

### eg data
for getting attendance of staffId: 125 with sample attendance record for 2 days
```
{
  attendance: {
    yasdfjsdasdfkj: {
      createdAt: 18th sep 2020 4:40:00:102 PM,
      absent: ["123", "124"]
    },
    weasdfcdsgljdf: {
      createdAt: 19th sep 2020 4:40:00:102 PM,
      absent: ["125", "123"]
    }
  }
}
```
now querying based on limiting createdAt within a week and absent to contains 125 

```
data = await col.where('createdAt', '>=', new Date(new Date().setDate(18))).where('createdAt', '<=', new Date(new Date().setDate(19))).where('absent', 'array-contains', '125').get()
```

will yield 
```
weasdfcdsgljdf: {
      createdAt: 19th sep 2020 4:40:00:102 PM,
      absent: ["125", "123"]
    }
```

Hence he is leave for one day and salary is reduced to `2000 - 1 * (2000/7)` and formulae is 
```
numberOfWorkingDays = 30 for monthly if weekly 7 
numberOfDayLeave = attendance Query if weekly else 0 for monthly
totalSalary - numberOfDayLeave * (totalSalary/numberOfWorkingDays)
```

## Calculating loan repayment
- check for `pending` status in `staffLoan` collection
- If any do query in `loanRepayment` with `loanId` equals `staff-loan-id` and sum up the `amount` field
- If totalPaidAmount is greater than loan amount update `pending` status as `PAID` else if advance try to reduce to pending amount else try to reduce the monthlyEMI

### eg data
for getting loan repayment of staffId: 125 with loan amount Rs. 2,000 on emi of Rs.1,000 with an salary on Rs.4,000
After loan has been issued db sample
```
{
  staffLoan: {
    basdfsajdf: {
      status: 0,
      amount: 2,000,
      type: 0,
      lenderEmpId: asdfasdf,
      lenderStaffId: 125,
      issuedBy: adfsasfdasdvvasdf,
      createdAt: <some day>,
      emiAmount: 1,000
    }
  },
  staffDetails: {
    <staff-id>: {
      empId: 125,
      name: kumar,
      payCycle: 1,
      salary: 4000,
    }
  }
}
```

Salary calculation in next week
staffLoan.lenderStaffId === 125 && staffLoan.status === 0 =====> `basdfsajdf`
loanRepayment.loanId === 'basdfsajdf' ====> null

Hence deduction should be staffLoan.basdfsajdf.emiAmount ======> 1,000

DB Snapshot after 1 week salary
``` diff
{
  staffLoan: {
    basdfsajdf: {
      status: 0,
      amount: 2,000,
      type: 0,
      lenderEmpId: 125,
      lenderStaffId: asdfasdf,
      issuedBy: adfsasfdasdvvasdf,
      createdAt: <some day>,
      emiAmount: 1,000
    }
  },
+ loanRepayment: {
+   asdfasdfasdfsadfasdfasdf: {
+    createdAt: <timestamp>,
+    lenderEmpId: 125,
+     lenderStaffId: asdfasdf,
+     receivedBy: dksnksdkfl,
+     amount: 1,000,
+     pendingAmount: 1,000,
+     loanId: basdfsajdf
+   }
+  }
  staffDetails: {
    asdfasdf: {
      empId: 125,
      name: kumar,
      payCycle: 1,
      salary: 4000,
    }
  }
}
```

DB snap after 2 week
``` diff
{
  staffLoan: {
    basdfsajdf: {
-      status: 0,
+      status: 1,
      amount: 2,000,
      type: 0,
      lenderEmpId: 125,
      lenderStaffId: asdfasdf,
      issuedBy: adfsasfdasdvvasdf,
      createdAt: <some day>,
      emiAmount: 1,000
    }
  },
  loanRepayment: {
    asdfasdfasdfsadfasdfasdf: {
      createdAt: <timestamp>,
      lenderEmpId: 125,
      lenderStaffId: asdfasdf,
      receivedBy: dksnksdkfl,
      amount: 1,000,
      pendingAmount: 1,000,
      loanId: basdfsajdf
    }
+    bcxvzvzsdfwsf: {
+      createdAt: <timestamp>,
+      lenderEmpId: 125,
+      lenderStaffId: asdfasdf,
+      receivedBy: dksnksdkfl,
+      amount: 1,000,
+      pendingAmount: 0,
+      loanId: basdfsajdf
+    }
+  }
  staffDetails: {
    asdfasdf: {
      empId: 125,
      name: kumar,
      payCycle: 1,
      salary: 4000,
    }
  }
}
```
