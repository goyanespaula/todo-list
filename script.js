$(document).ready(function() {
  var $form = $("form");
  var $input = $("#task");
  var newID = 1;
  var $todoContainer = $("#todo-container");
  var $todoList= $("#todo-list");
  var $sortButton = $("#sort-button");
  var $completedList = $("#completed-list");
  var sortFinishedItems = false;

  $form.on("submit", function(event) {
    event.preventDefault();

    var $li = $("<li>", {
      html: "<p>" + $input.val() + "</p>",
      id: newID
    });
    var $itemButtons = $("<div>", {
      class: "item-buttons"
    });
    var $remove = $("<a>", {
      html: "<i class='fas fa-trash-alt'></i>",
      class: "remove-button"
    });
    var $completed = $("<input>", {
      type: "checkbox",
      class: "complete-checkmark"
    });

    $itemButtons.append($completed, $remove);
    $li.append($itemButtons);
    $todoList.append($li);

    newID++;

    $form.trigger("reset");
  });

  $todoContainer.on("click", ".remove-button", function(event) {
    let $relevantItem = $(event.target).closest("li");
    $relevantItem.remove();
  });

  $todoContainer.on("click", ".complete-checkmark", function(event) {
    let $relevantItem = $(event.target).closest("li");

    $relevantItem.find("p")
      .toggleClass("strike-out");

    if (!$(this).is(":checked")) {
      sortBack($relevantItem);
    }

    if (sortFinishedItems) {
      moveCompleted($completedList);
    }
  });

  $sortButton.on("change", function() {
    if ($(this).is(":checked")) {
      sortFinishedItems = true;
      moveCompleted($completedList);
    } else {
      sortFinishedItems = false;
    }
  });
});

function moveCompleted($completedList) {
  setTimeout(function() {
    var $completed = $(".strike-out").closest("li");
    for (var i = 0; i < $completed.length; i++) {
      $($completed[i]).remove();
      $completedList.append($($completed[i]));
    }
  }, 100);
}

function sortBack($relevantItem) {
  var $listItems = $("#todo-list>li");
  var relevantID = $relevantItem.attr("id");
  var closestDistance = Infinity;
  var currentID;
  var distance;
  var closestID;
  var $closestItem;

  for (var i = 0; i < $listItems.length; i++) {
    currentID = $($listItems[i]).attr("id");
    distance = Math.abs(currentID - relevantID);

    if (distance < closestDistance && distance > 0) {
      closestDistance = distance; 
      closestID = currentID;
      $closestItem = $($listItems[i]);
    }
  }
  if (closestID < relevantID) {
    $($relevantItem).insertAfter($closestItem);
  } else {
    $($relevantItem).insertBefore($closestItem);
  }
}