package pep

import java.time.LocalDate

class BootStrap {

    def init = { servletContext ->

        LocalDate weekBegin = LocalDate.of(2018,12,31)

        (1..52).each { weekNr ->
            save Week.findOrCreateWhere(year: 2019, calendarWeek: weekNr, beginDate: toDate(weekBegin), endDate: toDate(weekBegin.plusDays(6)))
            weekBegin = weekBegin.plusDays(7)
        }

        Developer dierk  = Developer.findOrCreateWhere(firstName: "Dierk",  lastName: "König")
        Developer dieter = Developer.findOrCreateWhere(firstName: "Dieter", lastName: "Holz")
        save dierk
        save dieter

        Project webcl = Project.findOrCreateWhere(name: "Web Clients")
        Project uieng = Project.findOrCreateWhere(name: "UI Engineering")
        save webcl
        save uieng




    }

    private static Date toDate (LocalDate localDate) {
        return java.sql.Date.valueOf(localDate); // trick of the day
    }

    private static <Domain> Domain save(Domain domain) {
        domain.save(failOnError: true)
    }
    def destroy = {
    }
}
