import { ofType } from "redux-observable";
import { createType, getTodosSuccess, getTodos } from "./MainAction";
import { LoginState } from "@/pages/Home/Login/LoginAction";
import * as LoadingAction from "@/components/Spin/SpinAction";
import Resource from "@/resource";
import { mergeMap, concat, from, catchError, of } from "rxjs";
import { notification } from "antd";

const userLogoutEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_USER_LOGOUT),
    mergeMap(() => {
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.userLogout()).pipe(
          mergeMap((response): any => {
            if (response.status === 200) {
              const {
                data: { message },
              } = response;
              sessionStorage.clear();
              return concat(
                of(LoginState(message, false)),
                of(LoadingAction.loadingStatus(false))
              );
            } else {
              return concat(of(LoadingAction.loadingStatus(false)));
            }
          }),
          catchError((err): any => {
            console.error(err);
          })
        )
      );
    })
  );
};

const getTodosEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_GET_TODOS),
    mergeMap(() => {
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.getTodos()).pipe(
          mergeMap((response): any => {
            if (response.status === 200) {
              return concat(
                of(getTodosSuccess(response)),
                of(LoadingAction.loadingStatus(false))
              );
            } else {
              return concat(of(LoadingAction.loadingStatus(false)));
            }
          }),
          catchError(() => {
            return concat(of(LoadingAction.loadingStatus(false)));
          })
        )
      );
    })
  );
};

const addTodoEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_ADD_TODOS),
    mergeMap((payload: any) => {
      const todo = { content: payload.content };
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.addTodos({ todo })).pipe(
          mergeMap(() => {
            return concat(of(getTodos()));
          }),
          catchError(() => {
            return concat(of(LoadingAction.loadingStatus(false)));
          })
        )
      );
    })
  );
};

const editTodoEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_PUT_TODOS),
    mergeMap((payload: any) => {
      const todo = { content: payload.content };
      const id = payload.id;
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.editTodos({ todo }, id)).pipe(
          mergeMap((response: any) => {
            if (response.status === 200) {
              notification.success({
                message: "成功",
                description: "編輯成功",
              });
              return concat(of(getTodos()));
            } else {
              return concat(of(LoadingAction.loadingStatus(false)));
            }
          }),
          catchError(() => {
            return concat(of(LoadingAction.loadingStatus(false)));
          })
        )
      );
    })
  );
};

const deleteTodoEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_DELETE_TODOS),
    mergeMap((payload: any) => {
      const id = payload.id;
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.deleteTodos(id)).pipe(
          mergeMap((response: any) => {
            if (response.status === 200) {
              notification.success({
                message: "成功",
                description: "已刪除",
              });
              return concat(of(getTodos()));
            } else {
              return concat(of(LoadingAction.loadingStatus(false)));
            }
          }),
          catchError(() => {
            return concat(of(LoadingAction.loadingStatus(false)));
          })
        )
      );
    })
  );
};

const changeStatusTodoEpic = (action$: any) => {
  return action$.pipe(
    ofType(createType.MAIN_TODOS_CHANGE),
    mergeMap((payload: any) => {
      const id = payload.id;
      return concat(
        of(LoadingAction.loadingStatus(true)),
        from(Resource.MainResource.changeStatusTodos(id)).pipe(
          mergeMap((response: any) => {
            if (response.status === 200) {
              return concat(of(getTodos()));
            } else {
              return concat(of(LoadingAction.loadingStatus(false)));
            }
          }),
          catchError(() => {
            return concat(of(LoadingAction.loadingStatus(false)));
          })
        )
      );
    })
  );
};

export default [
  userLogoutEpic,
  getTodosEpic,
  addTodoEpic,
  editTodoEpic,
  deleteTodoEpic,
  changeStatusTodoEpic,
];
