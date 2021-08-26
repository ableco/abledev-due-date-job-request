import { __awaiter, __generator } from "tslib";
import { PrismaClient } from "@prisma/client";
var db = new PrismaClient();
var HostContext = {
    db: db,
    authenticate: function (_request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var currentUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.user.findFirst()];
                case 1:
                    currentUser = _a.sent();
                    if (currentUser) {
                        return [2 /*return*/, { userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id }];
                    }
                    else {
                        response.status(401).send("Authentication Failure");
                        throw new Error("Authentication Failure");
                    }
                    return [2 /*return*/];
            }
        });
    }); }
};
export default HostContext;
