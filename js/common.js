const getStageItems = $('.selection-stages .selection-stages-item');
const getNotification = $('.selection-stages .selection-stages-notification');
const changeStage = (index) => {$('.selection-stages-wrapper').css('transform', `translate(-${index * 100}%, 0)`)};
const showNotification = (id, setMode = false) => {
    getNotification.find('.selection-stages-notification__item').slideUp();
    setMode && getNotification.find(`.selection-stages-notification__item[data-stage-id="${id}"]`).slideDown();
};

getStageItems.click(function () {
    let activeClass = 'selection-stages-item--done',
        item = $(this),
        isDoneStage = item.hasClass(activeClass),
        stagePart = item.parent(),
        currentIndex = getStageItems.index(item) + 1;

    if (!isDoneStage) {
        getStageItems.slice(0, currentIndex).addClass(activeClass);
        showNotification(currentIndex, true);
        !item.next().length && stagePart.next().length && changeStage(stagePart.next().index())
    } else {
        getStageItems.slice(currentIndex - 1, getStageItems.length).removeClass(activeClass);
        showNotification(currentIndex);
        !item.prev().length && stagePart.prev().length && changeStage(stagePart.prev().index());
    }
});