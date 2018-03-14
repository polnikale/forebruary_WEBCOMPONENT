(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();

class PnklForebruary extends HTMLElement { 
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    this._month = '';
    this.monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
    this._year = '';
    this.dateIsBeingFilled = false;
    this._yearBegin = '';
    this._yearEnd = '';
    this._date = '';
    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          margin: 20px;
        }
        .wrapper-table {
          position: relative;
          margin: 30px 0 0 0;
          padding: 0;
        }
        td {
          width: 60px;
          height: 55px;
          text-align: center;
          color: #333333;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 30px;
          font-weight: bold;
          border-radius: 5px;
          transition: background-color .3s;
        }
        td.isInTheMonth {
          z-index: 11;
          position: relative;
        }
        td.isInTheMonth:hover {
          background-color: #D5D6D8;
        }
        table {
          background-color: #EFF0F2;
        }
        .overflow-table {
          cursor: pointer;
          top: -21px;
          left: -31px;
          position: absolute;
          padding: 168px 223px;
          z-index: 10;
          border: 28px solid #FAFAFA;
          transition: left 0.5s;
          box-shadow: 0px 4px 15px -2px rgba(0,0,0,0.75);
          border-radius: 3px;
        }
        .overflow-table.clicked {
          z-index: 15;
          transition: none;
        }

        select {
          padding: 2px 4px;
          border: 2px solid red;
        }
        select option {
          background-color: rgba(255,0,0, .4);
          padding: 4px;
          outline: none;
          color: white;
        }
      </style>
      <div class="wrapper">
        <select class="month">
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
        <select class="year">
        </select>
        
        <div class="wrapper-table">
          <table>
            <tr><td colspan="6" id="disabledTD"></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
            <tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
            <tr><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr>
            <tr><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr>
            <tr><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td></tr>
            <tr><td>30</td><td>31</td></tr>
          </table>
          <div class="overflow-table">
          </div>
        </div>
      </div>
    `;
    const fitFrameInMonth = () => { // arrow function because in other case this is related to event
      const overflowFrame = this.shadowRoot.querySelector('.overflow-table');
      const overflowFrameLeftPos = parseInt(overflowFrame.style.left);
      for (let i = 0; i < 63; i++) {
        if ((overflowFrameLeftPos -i) % 64 === 0) {
          console.log('overflow', overflowFrameLeftPos - i);
          if (overflowFrameLeftPos -i < -14) {
            overflowFrame.style.left = '-14px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          } else if (overflowFrameLeftPos -i > 370) {
            overflowFrame.style.left = '370px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          } else {
            overflowFrame.style.left = overflowFrameLeftPos - i -14 + 'px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          }
        } else if ((overflowFrameLeftPos + i) % 64 === 0) {
          console.log('overflow',overflowFrameLeftPos + i);
          if (overflowFrameLeftPos +i < -46) {
            overflowFrame.style.left = '-14px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          } else if (overflowFrameLeftPos +i > 370) {
            overflowFrame.style.left = '370px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          } else {
            overflowFrame.style.left = overflowFrameLeftPos + i -14 + 'px';
            console.log('overflowFin', overflowFrame.style.left);
            this.findMonthAndYear();
            this.checkTdsInFrame();
            break;
          }
        } 
        // -14 is default offset
      }
    }
    this.shadowRoot.querySelector('.month').addEventListener('change', (event) => {
      if (event.target.value !== this.month) {
        this.month = event.target.value;
      }
    });
    // I USED IT HERE BECAUSE I CAN'T ENCAPSULATE EVENT HANDLERS IN THEIR OWN FUNCTION BECAUSE I'M MISSING THIS KEYWORD IN THIS SITUATION. XD
    this.shadowRoot.querySelector('.year').addEventListener('change', (event) => {
      if (event.target.value !== this.year) {
        this.year = event.target.value;
      }
    });
    this.shadowRoot.addEventListener('dragstart', (event) => event.preventDefault);
    this.shadowRoot.querySelector('.overflow-table').addEventListener('mousedown', (event) => {
      const deltaClick = parseInt(event.target.style.left) - parseInt(event.clientX);
      const frameOverflow = event.target;
      frameOverflow.classList.add('clicked');
      var coords = this.getCoords(frameOverflow);
      var shiftX = event.pageX - coords.left;

      document.body.addEventListener('mousemove', moveFrame);
      this.shadowRoot.addEventListener('mouseup', stopMoving);
      function moveFrame(e) {
        frameOverflow.style.left = e.pageX - shiftX - 28 +'px'; // -28 is border
         
      }
      function stopMoving() {
        frameOverflow.classList.remove('clicked');
        document.body.removeEventListener('mousemove', moveFrame);
        shadowRoot.removeEventListener('mouseup', stopMoving);
        fitFrameInMonth(); // i can call it with this because this is related to event

      }
    });
  }
  get month() {
    return this._month;
  }
  set month(value) {
    this.setAttribute('month', value);
  }
  get year() {
    return this._year;
  }
  set year(value) {
    this.setAttribute('year', value);
  }
  get yearEnd() {
    return this._yearEnd;
  }
  set yearEnd(value) {
    this.setAttribute('year-end', value);
  }
  get yearBegin() {
    return this._yearBegin;
  }
  set yearBegin(value) {
    this.setAttribute('year-begin', value);
  }
  get date() {
    return this._date;
  }
  set date(value) {
    this.setAttribute('date', value);
  }

  static get observedAttributes() {
    return ['month', 'year', 'date', 'year-begin', 'year-end'];
  }

  attributeChangedCallback(name, oldval, newVal) {
    switch(name) {
      case 'month':
        this._month = newVal;
        this.changeSelectedMonth();
        this.rotateOverflowFrame();
        break;
      case 'year':
        this._year = newVal;
        this.changeSelectedYear();
        this.rotateOverflowFrame();
        break;
      case 'date':
        this._date = newVal;
        break;
      case 'year-begin':
        this._yearBegin = newVal;
        this.changeYearSelect();
        break;
      case 'year-end':
        this._yearEnd = newVal;
        this.changeYearSelect();
        break;
    }
  }
  connectedCallback() {
    this.changeYearSelect();
  }

  getCoords(elem) {
    // (1)
    var box = elem.getBoundingClientRect();
  
    var body = document.body;
    var docEl = document.documentElement;
  
    // (2)
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  
    // (3)
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  
    // (4)
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
  
    return {
      top: top,
      left: left
    };
  }
  checkTdsInFrame() {
    const overflowDiv = this.shadowRoot.querySelector('.overflow-table');
    const overflowPos = this.getCoords(overflowDiv);
    let tds = this.shadowRoot.querySelectorAll('td');
    Array.prototype.forEach.call(tds, (elem, index) => {
      const tdPos = this.getCoords(elem);
      if ((parseInt(tdPos.left) >= parseInt(overflowPos.left)) && (parseInt(tdPos.left) <= parseInt(overflowPos.left) + 420)) { // detecting elements, which are inside of that overflowBox on x coordinate
        if (elem.getAttribute('id') !== 'disabledTD') {
          elem.classList.add('isInTheMonth');
        }
      } else {
        if (elem.classList.contains('isInTheMonth')) {
          elem.classList.remove('isInTheMonth');
        }
      }
    });
  }
  changeYearSelect() {
    let dateBegin = +this.yearBegin;
    let dateEnd = +this.yearEnd;
    if (dateBegin === 0 && dateEnd === 0) {
      dateBegin = 1985;
      dateEnd = 2030; // if both are equal to '', it means that no data was passed
    }
    if ((dateBegin === '' || dateEnd === '')) {
      return false;
    }
    const yearSelect = this.shadowRoot.querySelector('.year');
    yearSelect.innerHTML = '';
    for (let i = dateBegin; i <= dateEnd; i++) {
      let option = document.createElement('option');
      option.innerText = i;
      yearSelect.appendChild(option);
    }
    this.changeSelectedYear();
  }
  changeSelectedMonth() {
    let options = this.shadowRoot.querySelectorAll('.month option');
    Array.prototype.forEach.call(options, (elem, index) => {
      if (elem.textContent === this.month) {
        elem.parentNode.selectedIndex = index;
      } 
    });
  }
  changeSelectedYear() {
    let options = this.shadowRoot.querySelectorAll('.year option');
    Array.prototype.forEach.call(options, (elem, index) => {
      if (elem.textContent === this.year) {
        elem.parentNode.selectedIndex = index;
      } 
    });
  }

  rotateOverflowFrame() {
    if (this.dateIsBeingFilled) {
      return false;
    }
    let day;
    const date = new Date(this.year, this.monthArray.indexOf(this.month)+1, 1);
    const overflowDiv = this.shadowRoot.querySelector('.overflow-table');
    if (this.date !== date && this.year && this.month) {
      this.date = date;
      day = date.getDay(); // 1 should have 'day' offset
      overflowDiv.style.left = (-14 + (day)*64) + 'px';
      this.checkTdsInFrame();
    }
  }

  findMonthAndYear() {
    // fix error
    const overflowFrame = this.shadowRoot.querySelector('.overflow-table');
    this.dateIsBeingFilled = true;
    const overflowFramePosLeft = parseInt(overflowFrame.style.left);
    const firstDayIndex = 7- Math.floor((overflowFramePosLeft + 14) / 64); // day of the week
    const currentMonthIndex = this.monthArray.indexOf(this.month) + 1;
    const currentYear = +this.year;
    for (let i = 0; i <= 50; i++) { // approximate value
      let monthNewIndexPos = currentMonthIndex + i;
      let minusYear = 0;
      const yearNewPos = Math.floor(monthNewIndexPos / 12) + currentYear;
      monthNewIndexPos = monthNewIndexPos % 12;
      if (new Date(yearNewPos, monthNewIndexPos, 1).getDay() === firstDayIndex) {
        this.year = yearNewPos;
        this.month = this.monthArray[monthNewIndexPos];
        this.dateIsBeingFilled = false;
        break;
      }
      let monthNewIndexNeg = currentMonthIndex - i;
      while (monthNewIndexNeg <= 0) {
        monthNewIndexNeg += 12;
        minusYear += 1;
      }
      const yearNewNeg = currentYear - minusYear;
      if (new Date(yearNewNeg, monthNewIndexNeg, 1).getDay() === firstDayIndex) {
        this.year = yearNewNeg;
        this.month = this.monthArray[monthNewIndexNeg];
        this.dateIsBeingFilled = false;
        break;
      }
    }
    
  }
}

customElements.define('pnkl-forebruary', PnklForebruary);