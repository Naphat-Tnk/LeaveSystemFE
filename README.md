## LeaveSystemFE
This project is part of the **front-end** system that manages employee leave, allowing employees to request leave through an online form, view leave history and total leave balance. The system displays the results in graphs to provide a clear picture of overall leave data. In addition, the administrator (Admin) can approve or reject employee leave requests through this system.

### Features
This system has a feature that allows you to filter data by leave type and leave status, and displays a graph of the results based on the filtering conditions set. In addition, the system can export leave data to an Excel file for offline use, and can also store data externally. There is also a dark mode for users who prefer dark colors.

### Install
#### Frontend
* Angular CLI 18
* npm install echarts
* npm install bootstrap
* npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid (install Calendar)
```
** don't for get import **
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import thLocale from '@fullcalendar/core/locales/th';
```
add like in index.html if you want to use icon-bootstrap
```
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
```

###  Run
* `ng serve` (run)
* `ng new name`(create new Angular)
* `ng g c name` (build component)

### How to used
1. Download project
2. Install dependencies and Install ECharts
3. Run project and Access application
   
**this project have backend if you want to try you can go to this link to be download**

https://github.com/Naphat-Tnk/LeaveSystemBE.git

## SonarQube
<img width="1237" height="639" alt="Screenshot 2025-07-29 230733" src="https://github.com/user-attachments/assets/28064fea-9b9f-4874-9ecb-2ae1105682ea" />

## Confess
* Unable to filter by selection on the Leave History page and the graph is not filtered accordingly.
* Dashboard page, calendar cannot filter departments.
