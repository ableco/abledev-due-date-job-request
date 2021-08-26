import { __awaiter, __generator } from "tslib";
export default function updateDueDate(_a, _b) {
    var id = _a.id, date = _a.date;
    var db = _b.db, authenticate = _b.authenticate, request = _b.request, response = _b.response;
    return __awaiter(this, void 0, void 0, function () {
        var userId, task;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, authenticate(request, response)];
                case 1:
                    userId = (_c.sent()).userId;
                    return [4 /*yield*/, db.task.findFirst({
                            where: {
                                id: id,
                                OR: [
                                    { assignedUserId: userId },
                                    {
                                        creatorId: userId
                                    },
                                ]
                            },
                            rejectOnNotFound: true
                        })];
                case 2:
                    task = _c.sent();
                    return [4 /*yield*/, db.task.update({
                            where: { id: task.id },
                            data: {
                                dueDate: date
                            }
                        })];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    });
}
