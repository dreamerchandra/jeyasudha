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
- If any do query in `loanRepayment` with `loanId` equals `staff-loan-id`