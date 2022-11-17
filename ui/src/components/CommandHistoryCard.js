import useCollapse from 'react-collapsed';

const CommandHistoryCard = ({ entry }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div>
      <div {...getToggleProps()}>
        {entry}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          Now you can see the hidden content. <br /><br />
          Click again to hide...
        </div>
      </div>
    </div>
  );
}

export default CommandHistoryCard