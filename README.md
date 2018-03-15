Здравствуйте, это мой тестовый проект по созданию компонента уникального календаря.
В ходе выполнения данной задачи я использовал технологию WebComponents. При использовании моего компонента, есть два разнхы варианта подключения и использования его:
1. Подключаем pnkl-forebruary.js, добавляем внутрь body нашего index.html <pnkl-forebruary></pnkl-forebruary> с нужными вам аттрибутами. 
Преимущества:
*проект работает прямо сразу же, открывая index.html
*используем script, а не еще неустойчивый import
Недостатки:
*нет кросс-браузерности(поддерживается Google Chrome + Opera)
*всё пишем в .js документе, неудобно редактировать html/css
2. (предпочтительно) Подключем pnkl-forebruary.html с помощью import, добавляем внутрь body нашего index.html <pnkl-forebruary></pnkl-forebruary> с нужными вам аттрибутами. После этого требуется открыть проект на сервере. Если Вам нужна кроссбраузерность, требуется установить bower_components в корень проекта, и добавить несколько строчек кода: 
```javascript
<script src="bower_components/webcomponentsjs/webcomponents-loader.js"></script>
<script>
  window.addEventListener('WebComponentsReady', function() {
    // At this point we are guaranteed that all required polyfills have loaded,
    // all HTML imports have loaded, and all defined custom elements have upgraded
    let MyElement = customElements.get('pnkl-forebruary');
    let element = document.querySelector('pnkl-forebruary');
    console.assert(element instanceof MyElement); 
  });
</script>
```
Преимущества: 
*Поддерживаются все современные браузеры
*Удобно редактировать html/css
*Использовать import в WebComponents - общепринятый стандарт
Недостатки:
*Затрата времени на первоначальную настройку

----------------------------------------------------------------------------------------------------------------------------------------------------

В Т/З проекта было сказано вывести дату в отдельном инпуте во внешнем компоненте. Мне не особо понравился такой подход, ибо в таком случае компонент, созданный с помощью WebComponents, который, по сути, не захламляет общий html/css вообще никак, начинает это делать. И если вставить 2 pnkl-forebruary, данные будут перезаписываться. В любом случае, я input добавил. Кроме этого, я также добавил аттрибут date у pnkl-forebruary. Каждый раз при изменении даты, этот аттрибут будет меняться. Мне этот подход нравится больше.

Связывание этого компонента с внешним компонентом производится с помощью аттрибутов у самого элемента

Наследование компонента происходит последствием создания нового класса, который, собственно, наследует PnklForebruary:
```javascript
class PnklForebruaryV2 extends PnklForebruary {
  constructor() {
    super()
  }
  connectedCallback() {
    console.log('Я новый компонент!');
  }
}
customElements.define('pnkl-forebruary2', PnklForebruaryV2);
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------
API
```javascript
<pnkl-forebruary></pnkl-forebruary>
```
attribute month   
```javascript
<pnkl-forebruary month="February"> 
```
аттрибут принимает строку с названием месяца на Английском. Месяц начинать с большой буквы. Каждый раз, когда месяц меняется, этот аттрибут тоже меняется
attribute year   
```javascript
<pnkl-forebruary year="2013"> 
```
аттрибут принимает строку с годом. Каждый раз, когда год меняется, этот аттрибут тоже меняется.
Атррибуты month и year обязательно задавать вместе. Если хоть один из этих аттрибутов не задать, начальный месяц будет January, а начальный год - value у атррибута date-begin или 1985(если не задано значение аттрибута).
attribute year-begin и year-end 
```javascript
<pnkl-forebruary year-begin="2013" year-end="2050">
``` 
аттрибуты принимают строку с годом. Если вы не задаете year-begin и year-end, стандартные значение - 1985/2030.
[WARNING] обязательно указывать или ни одного значение, или ибо. Если вы задаете одно значение, получаете ошибку.
attribute date. Его не надо указывать, достаточно просто getAttribute. Задавание date не дает ничего.
