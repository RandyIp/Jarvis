// import useCollapse from 'react-collapsed';

const CommandHistoryCard = ({ entry }) => {
  // const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  console.log(entry)
  return (
    <div>
      <div >
        {entry}
      </div>
      <div >
        <div className="content">
          Now you can see the hidden content. <br /><br />
          Click again to hide...
        </div>
      </div>
    </div>
  );
}

export default CommandHistoryCard