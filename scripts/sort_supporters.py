import toml

def sort_supporters_by_name(file_in, file_out=None):
    
    with open(file_in, 'r', encoding='utf-8') as f:
        data = toml.load(f)
    
    
    for tier, entries in data.items():
        if isinstance(entries, list):
            
            data[tier] = sorted(entries, key=lambda x: x.get('name', '').lower())
    
    
    output_file = file_out or file_in
    with open(output_file, 'w', encoding='utf-8') as f:
        toml.dump(data, f)
    print(f"Sorted supporters saved to: {output_file}")

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print("Usage: python sort_supporters.py supporters.toml [output.toml]")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
        sort_supporters_by_name(input_file, output_file)
