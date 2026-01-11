# Battery Cells Card

A custom Home Assistant Lovelace card for displaying battery cell voltages with color-coded min/max indicators.

Perfect for monitoring multi-battery energy storage systems with real-time cell balancing visualization.

## Features

- 🎨 **Color-coded cells**: Green (max voltage), Red (min voltage), Blue (normal)
- 📊 **Voltage delta display**: Shows difference between min/max cells in millivolts
- ⚡ **High performance**: Calculates min/max only once (97% fewer calculations vs templates)
- 🔋 **Flexible**: Supports 1-32 cells per battery
- 🎯 **Easy configuration**: Simple YAML setup, no complex templates
- 🔄 **Reliable**: Graceful handling of unavailable sensors

## Quick Start

```yaml
type: custom:battery-cells-card
entity_prefix: sensor.battery_1_battery_1_cell_
title: Battery 1 - Cells
num_cells: 16
```

## Perfect For

- Multi-battery energy storage systems (10+ batteries)
- LiFePO4 battery monitoring (16-cell packs)
- Solar + battery installations
- DIY battery management systems
- Cell balancing visualization

## Performance

**Before** (Markdown templates): 320 calculations for 10 batteries  
**After** (This card): 10 calculations for 10 batteries  
**Improvement**: 97% reduction! 🚀

## Configuration

All options are optional except `entity_prefix`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity_prefix` | string | **required** | Prefix for battery cell entities |
| `title` | string | "Battery Cells" | Card title |
| `num_cells` | integer | 16 | Number of cells (1-32) |
| `color_max` | string | "green" | Color for highest voltage cell |
| `color_min` | string | "red" | Color for lowest voltage cell |
| `color_normal` | string | "#3090C7" | Color for other cells |
| `show_delta` | boolean | true | Show voltage difference in mV |

## Screenshots

*(Add screenshots of your battery monitoring dashboard here)*

## Support

For issues, feature requests, or questions, please use the [GitHub Issues](https://github.com/yourusername/battery-cells-card/issues) page.

## License

MIT License - Free to use and modify
