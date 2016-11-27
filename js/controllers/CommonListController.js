/**
 * Created by wannes on 10/23/14.
 */
define(['app'], function (app) {
    app.CommonListController = function ($scope) {
        "use strict";

        $scope.showActions = function (event, selected) {
            var actionRow = document.querySelectorAll('.action-list').item(0);
            var row = event.currentTarget;
            var next = row.nextSibling;

            while (next) {
                if (next instanceof HTMLTableRowElement) break;
                next = next.nextSibling
            }

            var table = row.parentNode;

            if (next) {
                table.removeChild(actionRow);
                table.insertBefore(actionRow, next);
            } else {
                table.removeChild(actionRow);
                table.appendChild(actionRow);
            }

            angular.element(actionRow).removeClass('hidden');
            $scope.selected = selected;
        };
    }
});
