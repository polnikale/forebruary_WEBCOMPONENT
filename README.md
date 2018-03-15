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
<script src="bower_components/webcomponentsjs/webcomponents-loader.js"></script>
<script>
  window.addEventListener('WebComponentsReady', function() {
    // At this point we are guaranteed that all required polyfills have loaded,
    // all HTML imports have loaded, and all defined custom elements have upgraded
    let MyElement = customElements.get('pnkl-forebruary');
    let element = document.querySelector('pnkl-forebruary');
    console.assert(element instanceof MyElement);  // 👍
  });
</script>
Преимущества: 
*Поддерживаются все современные браузеры
*Удобно редактировать html/css
*Использовать import в WebComponents - общепринятый стандарт
Недостатки:
*Затрата времени на первоначальную настройку

----------------------------------------------------------------------------------------------------------------------------------------------------

В Т/З проекта было сказано вывести дату в отдельном инпуте во внешнем компоненте. Мне не особо понравился такой подход, ибо в таком случае компонент, созданный с помощью WebComponents, который, по сути, не захламляет общий html/css вообще никак, начинает это делать. И если вставить 2 pnkl-forebruary, данные будут перезаписываться. В любом случае, я input добавил. Кроме этого, я также добавил аттрибут date у pnkl-forebruary. Каждый раз при изменении даты, этот аттрибут будет меняться. Мне этот подход нравится больше.
