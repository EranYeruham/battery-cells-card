class BatteryCellsCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity_prefix) {
      throw new Error('You need to define entity_prefix');
    }
    this.config = config;
    
    // Create card structure
    if (!this.content) {
      this.innerHTML = `
        <ha-card>
          <div class="card-content">
            <div class="header"></div>
            <div class="cells-grid"></div>
          </div>
        </ha-card>
      `;
      this.content = this.querySelector('.card-content');
      this.header = this.querySelector('.header');
      this.grid = this.querySelector('.cells-grid');
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.updateCard();
  }

  updateCard() {
    const config = this.config;
    const hass = this._hass;
    
    // Configuration
    const entityPrefix = config.entity_prefix; // e.g., "sensor.battery_1_battery_1_cell_"
    const numCells = config.num_cells || 16;
    const title = config.title || 'Battery Cells';
    const colorMax = config.color_max || 'green';
    const colorMin = config.color_min || 'red';
    const colorNormal = config.color_normal || '#3090C7';
    const showDelta = config.show_delta !== false; // default true
    
    // Collect all cell voltages
    const cells = [];
    for (let i = 1; i <= numCells; i++) {
      const entityId = `${entityPrefix}${i}_voltage`;
      const state = hass.states[entityId];
      const voltage = state ? parseFloat(state.state) : null;
      cells.push({ id: i, voltage: voltage, entityId: entityId });
    }
    
    // Filter out null/invalid values for min/max calculation
    const validVoltages = cells.filter(c => c.voltage !== null).map(c => c.voltage);
    const maxVoltage = validVoltages.length > 0 ? Math.max(...validVoltages) : null;
    const minVoltage = validVoltages.length > 0 ? Math.min(...validVoltages) : null;
    const deltaVoltage = (maxVoltage !== null && minVoltage !== null) ? maxVoltage - minVoltage : null;
    
    // Update header
    let headerHtml = `<center><b>${title}</b>`;
    if (showDelta && deltaVoltage !== null) {
      headerHtml += `<br><small>Δ ${(deltaVoltage * 1000).toFixed(1)} mV</small>`;
    }
    headerHtml += `</center>`;
    this.header.innerHTML = headerHtml;
    
    // Build cells grid
    let gridHtml = '';
    cells.forEach(cell => {
      let color = colorNormal;
      let displayValue = 'N/A';
      
      if (cell.voltage !== null) {
        displayValue = cell.voltage.toFixed(3) + ' V';
        
        if (cell.voltage === maxVoltage) {
          color = colorMax;
        } else if (cell.voltage === minVoltage) {
          color = colorMin;
        }
      }
      
      gridHtml += `
        <div class="cell-item">
          🔋${cell.id.toString().padStart(2, '0')}.&nbsp;&nbsp;&nbsp;
          <font color="${color}">${displayValue}</font>
        </div>
      `;
    });
    
    this.grid.innerHTML = gridHtml;
  }

  getCardSize() {
    return 3;
  }

  static getStubConfig() {
    return {
      entity_prefix: "sensor.battery_1_battery_1_cell_",
      title: "Battery 1 - Cells",
      num_cells: 16
    };
  }
}

customElements.define('battery-cells-card', BatteryCellsCard);

// Add to custom cards list
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'battery-cells-card',
  name: 'Battery Cells Card',
  description: 'Display battery cell voltages with color-coded min/max values',
  preview: true,
  documentationURL: 'https://github.com/yourusername/battery-cells-card'
});

// Add styles
const style = document.createElement('style');
style.textContent = `
  battery-cells-card {
    display: block;
  }
  
  battery-cells-card .card-content {
    padding: 16px;
  }
  
  battery-cells-card .header {
    margin-bottom: 12px;
  }
  
  battery-cells-card .cells-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    text-align: center;
  }
  
  battery-cells-card .cell-item {
    padding: 2px 0;
  }
`;
document.head.appendChild(style);