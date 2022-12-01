import "./profileNotes.scss";
import { useSelector, useDispatch } from "react-redux";
import { setActiveNotesFilter } from "../../../slices/profileSlice";
import { v4 as uuidv4 } from "uuid";

const ProfileNotes = () => {
    const dispatch = useDispatch();
    const notesTypes = useSelector((state) => state.profile.notesTypes);
    const notes = useSelector((state) => state.global.userData.notes);
    const activeNotesFilter = useSelector(
        (state) => state.profile.activeNotesFilter
    );

    const renderNotes = (notesTypes) => {
        return notesTypes.map(({ name, text }) => {
            const className = "profile__note";
            const count = Object.values(notes).filter(
                (item) => item.note === name
            ).length;
            return (
                <li
                    onClick={() => dispatch(setActiveNotesFilter(name))}
                    key={uuidv4()}
                    className={`${className} ${
                        activeNotesFilter === name ? "active" : ""
                    }`}
                >
                    {text}
                    <span className="profile__note-count">{count}</span>
                </li>
            );
        });
    };

    if (!notes) {
        return (
            <p className="profile__notes-not-found">
                У вас пока ничего нет в закладках
            </p>
        );
    }

    const renderedNotes = renderNotes(notesTypes);
    renderedNotes.unshift(
        <li
            onClick={() => dispatch(setActiveNotesFilter("all"))}
            key={uuidv4()}
            className={`profile__note ${
                activeNotesFilter === "all" ? "active" : ""
            }`}
        >
            Все
            <div className="profile__note-count">
                {Object.values(notes).length}
            </div>
        </li>
    );

    return <ul className="profile__notes">{renderedNotes}</ul>;
};
export default ProfileNotes;
