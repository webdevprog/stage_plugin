const getStageItems = $('.selection-stages .selection-stages-item');
const getNotification = $('.selection-stages .selection-stages-notification');
const changeStage = (index) => {$('.selection-stages-wrapper').css('transform', `translate(-${index * 100}%, 0)`)};
const toggleNotification = (id, elm, setMode = false) => {
    let typeNotifacation = getNotification.find(`.selection-stages-notification__item[data-stage-id="${id}"]`).data('type-stage');
    getNotification.find('.selection-stages-notification__item').slideUp();
    setMode && getNotification.find(`.selection-stages-notification__item[data-stage-id="${id}"]`).slideDown();
    setMode && typeNotifacation ? elm.addClass(typeNotifacation) : elm.removeClass(typeNotifacation);
};

getStageItems.find('.selection-stages-item-content').click(function () {
    let activeClass = 'selection-stages-item--done',
        item = $(this).parent(),
        isDoneStage = item.hasClass(activeClass),
        stagePart = item.parent(),
        currentIndex = getStageItems.index(item) + 1;

    if (isDoneStage) {
        getStageItems.slice(currentIndex - 1, getStageItems.length).removeClass(activeClass);
        toggleNotification(currentIndex, item, false);
        !item.prev().length && stagePart.prev().length && changeStage(stagePart.prev().index());
    } else {
        getStageItems.slice(0, currentIndex).addClass(activeClass);
        toggleNotification(currentIndex, item, true);
        !item.next().length && stagePart.next().length && changeStage(stagePart.next().index())
    }
});