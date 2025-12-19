import Draggable from 'react-draggable';
import { motion } from 'framer-motion';

interface WindowProps {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

export const Window = ({ title, onClose, onFocus, isActive, children }: WindowProps) => {
  return (
    <Draggable handle=".title-bar" onStart={onFocus}>
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`window absolute w-[450px] shadow-2xl ${isActive ? 'z-50' : 'z-10'}`}
        onClick={onFocus}
      >
        <div className={`title-bar ${!isActive ? 'inactive' : ''}`}>
          <div className="title-bar-text">{title} - ShishirXP</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          </div>
        </div>
        <div className="window-body bg-white m-[2px] min-h-[150px] p-4">
          {children}
        </div>
      </motion.div>
    </Draggable>
  );
};