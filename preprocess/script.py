import re
import csv

# open not_country.csv file and create a list of countries
with open('not_country.csv', 'r') as f:
    reader = csv.reader(f)
    not_country = reader.__next__()
    # print(not_country)


def replace_spaces_with_underscore(svg_content):
    # Regular expression pattern to match class attribute values
    pattern = r'className="([^"]*)"'

    # Function to replace spaces with underscores in class attribute values
    def replace_spaces(match):
        country_name = match.group(1)
        if country_name in not_country:
            return f'className= "not-country {country_name}"'
        else:
            country_name = country_name.replace(' ', '_')
            return f'className={{hoveredCountry === "country {country_name}" ? "country-hover": "country {country_name}"}}\nonMouseOver={{handleMouseOver}}\nonMouseLeave={{handleMouseLeave}}'

    # Perform the replacement using regular expressions
    modified_svg_content = re.sub(pattern, replace_spaces, svg_content)

    return modified_svg_content


def main():
    # Input SVG file name
    input_svg_file = 'map.svg'
    # Output SVG file name
    output_svg_file = 'output.svg'

    # Read the content of the input SVG file
    with open(input_svg_file, 'r') as f:
        svg_content = f.read()

    # Modify the SVG content
    modified_svg_content = replace_spaces_with_underscore(svg_content)

    # Write the modified SVG content to the output file
    with open(output_svg_file, 'w') as f:
        f.write(modified_svg_content)

    print("SVG classes with spaces replaced by underscores. Output saved to", output_svg_file)


if __name__ == "__main__":
    main()
