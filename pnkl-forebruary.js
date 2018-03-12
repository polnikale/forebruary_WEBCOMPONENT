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
    this._date = '';
    this.shadowRoot.innerHTML = `
      <style>
        .wrapper-table {
          position: relative;
          margin: 30px 0 0 0;
          padding: 0;
        }
        td {
          width: 65px;
          height: 55px;
          text-align: center;
          color: #333333;
          font-family: 'Helvetica Neue', sans-serif;
          font-size: 24px;
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
          left: 174px;
          position: absolute;
          padding: 168px 243px;
          z-index: 10;
          border: 28px solid #FAFAFA;
          transition: left 0.5s;
          box-shadow: 0px 4px 15px -2px rgba(0,0,0,0.75);
          border-radius: 3px;
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
      <div>
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
          <option>1988</option>
          <option>1989</option>
          <option>1990</option>
          <option>1991</option>
          <option>1992</option>
          <option>1993</option>
          <option>1994</option>
          <option>1995</option>
          <option>1996</option>
          <option>1997</option>
          <option>1998</option>
          <option>1999</option>
          <option>2000</option>
          <option>2001</option>
          <option>2002</option>
          <option>2003</option>
          <option>2004</option>
          <option>2005</option>
          <option>2006</option>
          <option>2007</option>
          <option>2008</option>
          <option>2009</option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
          <option>2028</option>
          <option>2029</option>
          <option>2030</option>
          <option>2031</option>
          <option>2032</option>
          <option>2033</option>
          <option>2034</option>
          <option>2035</option>
          <option>2036</option>
          <option>2037</option>
          <option>2038</option>
        </select>
        
        <div class="wrapper-table">
          <table>
            <tr><td colspan="6"></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
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

  get date() {
    return this._date;
  }
  set date(value) {
    this.setAttribute('date', value);
  }

  static get observedAttributes() {
    return ['month', 'year', 'date'];
  }

  attributeChangedCallback(name, oldval, newVal) {
    switch(name) {
      case 'month':
        this._month = newVal;
        this.changeSelectedMonth(newVal);
        this.rotateOverflowFrame();
        break;
      case 'year':
        this._year = newVal;
        this.changeSelectedYear(newVal);
        this.rotateOverflowFrame();
        break;
    }
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
  connectedCallback() {
    this.checkTdsInFrame();
    this.changeSelectedYear();
  }
  checkTdsInFrame() {
    const overflowDiv = this.shadowRoot.querySelector('.overflow-table');
    const overflowPos = this.getCoords(overflowDiv);
    let tds = this.shadowRoot.querySelectorAll('td');
    Array.prototype.forEach.call(tds, (elem, index) => {
      const tdPos = this.getCoords(elem);
      if ((parseInt(tdPos.left) >= parseInt(overflowPos.left)) && (parseInt(tdPos.left) <= parseInt(overflowPos.left) + 514)) { // detecting elements, which are inside of that overflowBox on x coordinate
        elem.classList.add('isInTheMonth');
      } else {
        if (elem.classList.contains('isInTheMonth')) {
          elem.classList.remove('isInTheMonth');
        }
      }
    });
  }
  changeSelectedMonth() {
    let options = this.shadowRoot.querySelectorAll('.month option');
    Array.prototype.forEach.call(options, (elem, index) => {
      if (elem.textContent === this.month) {
        elem.parentNode.selectedIndex = index;
        console.log(elem.parentNode);
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
    let day;
    let date = new Date(this.year, this.monthArray.indexOf(this.month)+1, 1);
    console.log(this.date);
    console.log(date);
    if (this.date !== date) {
      this.date = date;
      day = date.getDay();
      console.log(day);
    }
  }
}

customElements.define('pnkl-forebruary', PnklForebruary);