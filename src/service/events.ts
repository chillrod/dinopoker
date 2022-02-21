export default {
  character: {
    select: "@dino.SELECT_CHARACTER",
  },
  room: {
    changeConfig: "@dino.CHANGE_ROOM_CONFIG",
    changeRoundCount: "@dino.CHANGE_ROOM_ROUND_COUNT",
    join: "@dino.JOIN_ROOM",
    disconnect: "@dino.DISCONNECT_ROOM",
    leave: "@dino.LEAVE_ROOM",
    share: "@dino.SHARE_ROOM",
  },
  actions: {
    confirm: "@dino.CONFIRM_ACTION",
    cancel: "@dino.CANCEL_ACTION",
    toast: "@dino.TOAST_ACTION",
    messageBox: "@dino.MESSAGE_BOX_ACTION",
    error: "@dino.ERROR_ACTION",
    success: "@dino.SUCCESS_ACTION",
    loading: "@dino.LOADING_ACTION",
    loadingEnd: "@dino.LOADING_END_ACTION",
  },
  vote: {
    start: "@dino.VOTE_START",
    select: "@dino.VOTE_SELECT",
    reveal: "@dino.VOTE_REVEAL",
    round: "@dino.VOTE_ROUND",
    end: "@dino.VOTE_END",
  },
};
