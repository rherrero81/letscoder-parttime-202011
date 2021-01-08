import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { XYCoord } from 'dnd-core'
import Operations from '../Forex/Operations';
import Operator from '../Forex/Operator'
import Search from '../Forex/Search'
import Charts from '../Forex/Charts'
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const Card= ({ id, body, index,type,token, moveCard,className,order,refreshOps,refreshOperations,refreshOperator,setRemoveOrderParam,removeOrderParam }) => {
	const ref = useRef(null)
	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index

			// Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current ? ref.current.getBoundingClientRect():null;

            // Get vertical middle
            const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.CARD, id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0.2 : 1
	drag(drop(ref))
	return (<div ref={ref} className={className} style={{ ...{ 
		backgroundColor: 'white',
		cursor: 'move',
	}, opacity }} >
		{ type==0 && <div className="contRemoveWidget"> <Tooltip title="Drug & drop using base of widget here in order to remove"><button ><DeleteOutlineIcon style={{fontSize: '16px'}} /></button></Tooltip></div>} 
		{ type==1 && <Search token={ token} order={ order} refreshOperations={ refreshOperations} refreshOperator={ refreshOperator} 	removeOrderParam={removeOrderParam}
			setRemoveOrderParam={setRemoveOrderParam}/>}
		{ type==2 && <Charts token={ token} order={ order} refreshOperations={ refreshOperations} refreshOperator={ refreshOperator} />}
		{ type==3 && <Operations refreshOps={refreshOps} token={ token} order={ order} refreshOperations={ refreshOperations} refreshOperator={ refreshOperator} removeOrderParam={removeOrderParam}
			setRemoveOrderParam={setRemoveOrderParam} />}
		{ type==4 && order && <Operator token={ token} order={ order} refreshOperations={ refreshOperations} refreshOperator={ refreshOperator} />}
  
		</div>
	)
}

export default Card
