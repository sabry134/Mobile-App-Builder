console.log('Renderer process loaded!');

const dropZone = document.getElementById('drop-zone');
const leftPanel = document.getElementById('left-panel');

dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('drop', dropToMiddle);
leftPanel.addEventListener('dragover', dragOverLeftPanel);
leftPanel.addEventListener('drop', dropToLeftPanel);

function dragOver(event) {
  event.preventDefault();
}

function dropToMiddle(event) {
    event.preventDefault();
    const dataType = event.dataTransfer.getData('text/plain');
    
    const droppedContainer = document.createElement('div');
    droppedContainer.classList.add('dropped-element');
    
    const droppedElement = document.createElement('div');
    droppedElement.textContent = dataType;
    droppedElement.classList.add('draggable');
    droppedElement.setAttribute('draggable', true);
    droppedElement.setAttribute('data-type', dataType);
    
    droppedContainer.appendChild(droppedElement);
    
    const customizeButton = document.createElement('button');
    customizeButton.textContent = 'Customize';
    customizeButton.classList.add('customize-button');
    droppedContainer.appendChild(customizeButton);
    
    dropZone.appendChild(droppedContainer);
    
    droppedElement.addEventListener('dragstart', dragStart);
    droppedElement.addEventListener('dragend', dragEnd);
  }

function dragOverLeftPanel(event) {
  event.preventDefault();
}

function dropToLeftPanel(event) {
    event.preventDefault();
    const dataType = event.dataTransfer.getData('text/plain');
    
    const draggedElement = document.querySelector(`#drop-zone [data-type="${dataType}"]`);
    if (draggedElement) {
      const droppedContainer = draggedElement.closest('.dropped-element');
      if (droppedContainer) {
        droppedContainer.parentNode.removeChild(droppedContainer);
      }
    }
    
    const customizeButtons = document.querySelectorAll('.customize-button');
    if (customizeButtons.length === 0) {
      const allCustomizeButtons = document.querySelectorAll('.customize-button');
      allCustomizeButtons.forEach(button => {
        button.parentNode.removeChild(button);
      });
    }
  }
  
  
  
const draggableElements = document.querySelectorAll('.draggable');

draggableElements.forEach(element => {
  element.addEventListener('dragstart', dragStart);
  element.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.type);
}

function dragEnd(event) {
}
