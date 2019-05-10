(function() {
    var header = document.getElementById("header");
    var DivMonth = document.createElement('div');
    DivMonth.id = "fieldMonth";
    header.appendChild(DivMonth);

    var monthNames = ["Выбрать месяц", "Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    var strMonth = '<label for="month">Месяц</label><select name="month" id="monthId" class="select-field">';
    for (var i = 0; i < monthNames.length; i++) {
        strMonth += `<option value = "${i}">${monthNames[i]}</option>`;
    }
    strMonth += '</select>';

    DivMonth.innerHTML = strMonth;

    var DivYear = document.createElement('div');
    DivYear.id = "fieldYear";
    header.appendChild(DivYear);

    var YearsArr = ["Выбрать год", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988",
        "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
        "2000", "2001", "2002", "2003", "2000", "2001", "2002", "2003", "2000", "2001", "2002",
        "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013",
        "2014", "2015", "2016", "2017", "2018", "2019", "2020"
    ];

    var strYear = '<label for="year">Год</label><select name="year" id="yearId" class="select-field">';

    for (var i = 0; i < YearsArr.length; i++) {
        strYear += `<option value = "${YearsArr[i]}">${YearsArr[i]}</option>`;
    }
    strYear += '</select>';

    DivYear.innerHTML = strYear;

    var ButtonCreateCalend = document.createElement('button');
    ButtonCreateCalend.id = "createCalend";
    header.appendChild(ButtonCreateCalend);
    ButtonCreateCalend.innerText = "Создать";

    var ButtonRemoveCalend = document.createElement('button');
    ButtonRemoveCalend.id = "removeCalend";
    header.appendChild(ButtonRemoveCalend);
    ButtonRemoveCalend.innerText = "Удалить";


    var SelectMonth = document.getElementById('monthId'); //селект для месяца
    var SelectYear = document.getElementById('yearId'); //селект для года

    var OptionMonth = SelectMonth.options[SelectMonth.selectedIndex].value;
    var OptionYear = SelectYear.options[SelectYear.selectedIndex].value;


    if ((OptionMonth !== "Выбрать месяц") || (OptionYear == !"Выбрать год")) {
        ButtonCreateCalend.setAttribute("editable", true);
        ButtonCreateCalend.classList.remove('disabled');
    } else {
        ButtonCreateCalend.setAttribute("disabled", true);
        ButtonCreateCalend.classList.add('disabled');
    }

    // if (OptionMonth || OptionYear) {
    //     ButtonCreateCalend.setAttribute("editable", true);
    //     ButtonCreateCalend.classList.remove('disabled');
    // }


    ButtonCreateCalend.addEventListener('click', AddCalendar);
    var count = 0;
    var wraperCalendar;


    function AddCalendar() {
        var SelectMonth = document.getElementById('monthId'); //селект для месяца
        var SelectYear = document.getElementById('yearId'); //селект для года

        var OptionMonth = SelectMonth.options[SelectMonth.selectedIndex].value;
        var OptionYear = SelectYear.options[SelectYear.selectedIndex].value;
        var month = parseInt(OptionMonth);
        var year = parseInt(OptionYear);
        var _month = month - 1;

        console.log(_month)
        console.log(year)

        wraperCalendar = document.createElement('div');
        var section = document.getElementById("section");
        count = count + 1;
        console.log(count);
        wraperCalendar.id = `${count}`;
        section.appendChild(wraperCalendar);
        wraperCalendar.style.cssText = "display:flex;flex-direction: column;justify-content: center;align-items: center;height: 500px;width: 100%;"

        GenerateCalendar(`${count}`, _month, year);
    }

    ButtonRemoveCalend.addEventListener('click', RemoveCalendar);

    function RemoveCalendar() {
        count = count + 1;
        var section = document.getElementById("section");
        section.removeChild(section.children[0]);
    }

    function GenerateCalendar(id, _month, year) {

        var date = new Date(year, _month);

        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

        var div = document.getElementById(`${count}`);
        var ButtonPanel = document.createElement('tr');
        ButtonPanel.innerHTML = '<tr id="panel"><td class="change_year"><button class="btn_year" id="prevyearBtn">&lt;&lt;</button></td><td class="change_month"><button class="btn_month" id="previousmonthBtn">&lt;</button></td><td colspan="3" id = "display_month"><div id="descripMonth"></div><div id="descripYear"></div></td><td class="change_month"><button class="btn_month" id="nextmonthBtn">&gt;</button></td><td class="change_year"><button class="btn_year" id="nextyearBtn">&gt;&gt;</button></td><tr>'
        ButtonPanel.style.cssText = 'border: 2px solid rgb(156, 156, 156); border-bottom: none;background-color: #ae2a0c;box-sizing: border-box;width: 422px;height: 60px;'

        createCalendar(`${count}`, _month, year);

        div.insertBefore(ButtonPanel, div.firstChild);
        AddStyle();

        var monthN = monthNames[_month];
        var yeardescription = document.getElementById("descripYear");
        yeardescription.innerHTML = `${year} год`;
        var monthdescription = document.getElementById("descripMonth");
        monthdescription.innerHTML = `${monthN}`;


        yearNextClicks();
        yearPreviousClicks();
        monthNextClicks();
        monthPreviousClicks();
        HightlightCell();

        function createCalendar(id, _month, year) {
            var div = document.getElementById(`${count}`);

            var element = document.getElementById(id);

            // var monthN = monthNames[_month];
            // var yeardescription = document.getElementById("descripYear");
            // yeardescription.innerHTML = `${year} год`;
            // var monthdescription = document.getElementById("descripMonth");
            // monthdescription.innerHTML = `${monthN}`;

            var next_month = _month + 1;
            var previous_month = _month;

            var date = new Date(year, _month);
            var datenextMonth = new Date(year, next_month);
            var datepreviousMonth = new Date(year, previous_month, 0);
            datepreviousMonth.setDate(datepreviousMonth.getDate() - getDay(date));

            var table = '<table><tr>';

            // ячейки предыд месяца
            for (var i = 0; i < getDay(date); i++) {
                datepreviousMonth.setDate(datepreviousMonth.getDate() + 1);
                table += '<td id="Pmonth"> ' + datepreviousMonth.getDate() + '</td>';
            }

            // ячейки календаря с датами
            while (date.getMonth() == _month) {

                if ((getDay(date) % 7 == 6) || (getDay(date) % 7 == 5)) {
                    table += '<td id="weekend">' + date.getDate() + '</td>';
                } else {
                    table += '<td>' + date.getDate() + '</td>';
                }
                let newDate = new Date(date.getTime());
                newDate.setDate(newDate.getDate() + 1);
                let nextDayMonth = newDate.getMonth();
                if (getDay(date) % 7 == 6 && nextDayMonth == _month) { // вс, последний день - перевод строки
                    table += '</tr><tr>';
                }
                date.setDate(date.getDate() + 1);
            }

            // добить таблицу  ячейками след месяца
            if (getDay(date) != 0) {
                for (var i = getDay(date); i < 7; i++) {
                    table += '<td id="Nmonth">' + datenextMonth.getDate() + '</td>';
                    datenextMonth.setDate(datenextMonth.getDate() + 1);
                }
            }

            table += '</tr></table>';
            element.innerHTML = table;

            var weekdays = document.querySelectorAll('#weekend');
            for (var i = 0; i < weekdays.length; i++) {
                var weekday = weekdays[i];
                weekday.style.backgroundColor = "#4e4c4ce7";
                weekday.style.color = "# ffffff;";
            }
        }

        function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
            var day = date.getDay();
            if (day == 0) { day = 7 };
            return day - 1;
        }

        function yearNextClicks() {
            var updater = function() {
                return {
                    getYear: () => year,
                    nextYear: () => ++year
                }
            }
            var nextyearBtn = document.getElementById("nextyearBtn");
            var update = updater();
            // createCalendar(`${count}`, _month, update.getYear());

            nextyearBtn.addEventListener('click', function() {
                update.nextYear();
                var yeardescription = document.getElementById("descripYear");
                yeardescription.innerHTML = `${update.getYear()} год`;

            })
        }

        function yearPreviousClicks() {
            var updater = function() {
                return {
                    getYear: () => year,
                    prevYear: () => --year
                };
            };
            var prevyearBtn = document.getElementById("prevyearBtn");
            var update = updater();
            // createCalendar(`${count}`, _month, update.getYear());

            prevyearBtn.addEventListener('click', function() {
                update.prevYear();
                var yeardescription = document.getElementById("descripYear");
                yeardescription.innerHTML = `${update.getYear()} год`;

            })
        }

        function monthNextClicks() {
            var updater = function() {
                return {
                    getMonth: () => _month,
                    nextMonth: () => {
                        if (_month + 1 == 12) {
                            year++;
                        }
                        return _month = ++_month % 12;
                    },
                    getYear: () => year,
                    nextYear: () => ++year
                }
            }

            var nextmonthBtn = document.getElementById("nextmonthBtn");
            let update = updater();
            nextmonthBtn.addEventListener('click', function() {
                update.nextMonth();
                // createCalendar(`${count}`, `${update.getMonth()}`, year);
                var monthdescription = document.getElementById("descripMonth");
                let monthN = monthNames[update.getMonth()];
                monthdescription.innerHTML = `${monthN}`;
                var yeardescription = document.getElementById("descripYear");
                yeardescription.innerHTML = `${update.getYear()} год`;
            })
        }

        function monthPreviousClicks() {
            var updater = function() {
                return {
                    getMonth: () => _month,
                    prevMonth: () => {
                        if (_month - 1 == -1) {
                            year--;
                            return _month = 11;
                        }
                        return --_month;
                    },
                    getYear: () => year,
                    prevyear: () => --year
                }
            }
            var previousmonthBtn = document.getElementById("previousmonthBtn");
            let update = updater();
            previousmonthBtn.addEventListener('click', function() {
                update.prevMonth();
                // createCalendar(`${count}`, `${update.getMonth()}`, year);
                var monthdescription = document.getElementById("descripMonth");
                let monthN = monthNames[update.getMonth()];
                monthdescription.innerHTML = `${monthN}`;
                var yeardescription = document.getElementById("descripYear");
                yeardescription.innerHTML = `${update.getYear()} год`;
            })
        }

        function HightlightCell() {
            var selectedTd;
            var calendarTable = document.getElementById(`${count}`);

            calendarTable.addEventListener('click', function(event) {
                var target = event.target;
                if (target.tagName != 'TD') return;
                highlight(target);
            })

            function highlight(node) {
                if (selectedTd) {
                    selectedTd.classList.remove('highlight');
                }
                if (selectedTd !== node) {
                    selectedTd = node;
                    selectedTd.classList.add('highlight');
                } else {
                    selectedTd = null;
                }

            }
        }

        function AddStyle() {
            var yearBtns = document.getElementsByClassName('btn_month ');
            for (var i = 0; i < yearBtns.length; i++) {
                var yearBtn = yearBtns[i];
                yearBtn.style.width = '34px';
                yearBtn.style.height = "25px";
                yearBtn.style.backgroundColor = "#f8f5f5";
                yearBtn.style.color = " #000";
                yearBtn.style.marginTop = "10px";
                yearBtn.style.borderRadius = "7px";
                yearBtn.style.cursor = "pointer";
            }

            var monthBtns = document.getElementsByClassName('btn_year ');
            for (var i = 0; i < monthBtns.length; i++) {
                var monthBtn = monthBtns[i];
                monthBtn.style.cssText = 'width: 45px;height: 25px; border-radius: 7px;background-color: #f8f5f5;color: #000;margin-top: 10px;cursor:pointer;'
            }
            var monthdescription = document.getElementById("descripMonth");
            monthdescription.style.cssText = 'text-transform: uppercase; font-size: 13px;font-weight: 700; text-align: center;color: rgb(255, 255, 255);'
            var yeardescription = document.getElementById("descripYear");
            yeardescription.style.cssText = 'text-transform: uppercase; font-size: 15px;font-weight: 700; text-align: center;color: rgb(255, 255, 255);'
            var displMonth = document.getElementById("display_month");
            displMonth.style.cssText = 'width: 182px;height: 50px;box-sizing: border-box;';

        }

    }
}())